import React, { Component } from 'react';
import API from '../utils/API';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import OneQuestion from "../components/questions/OneQuestion";
import { Link } from 'react-router-dom';
import withAuth from './../components/withAuth';
import moment from 'moment'

class AllQuestions extends Component {

    state = {
        questions: [],
        data: {}
    };

    //If questions is empty, we will show one question with details

    componentDidMount() {
        console.log(this.props.user.username);
        API
            .displayQuestions()
            .then(response => {
                this.setState({ questions: response.data });
                console.log(this.state.questions)
            })
            .catch(err => console.log(err));
    }

    handleClick(id) {
        // alert("I've been clicked");
        API
            .displayOneQuestion(id)
            .then(res => {
                console.log(res);
                this.setState({ data: res.data });
                console.log(this.state.data)
            })
    }

    formatDate = (date) => {
        // console.log(Date.now());
        let formatDate = moment(date).format('MMMM Do YYYY, h:mm:ss a');
        
        console.log(formatDate);
        return formatDate;
    }

    render() {
        return (
            <div className="questions">
                {/* <OneQuestion
                    data={this.state.data}
                /> */}
                {this.state.questions.map(question => (
                    <div key={question._id}>
                        <Link to={`/question/${question._id}`}>
                        <div className="card w-75">
                            <div onClick={() => this.handleClick(question._id)} className="card-body">
                                <h5 className="card-title">{question.title}</h5>
                                <p className="card-text">{question.body}</p>
                                <p className="card-text">By {question.username} at {this.formatDate(question.date)}</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                ))}
                {/* <a href="#" class="btn btn-primary">Submit</a> */}
            </div>
        )
    }
}

export default withAuth(AllQuestions);

/*



*/