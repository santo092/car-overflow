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
        //Returns a string of query parameters using a search
        console.log(this.props);
        let params = new URLSearchParams(this.props.history.location.search);
        console.log("Stuff", params.get("search"))
        if (params.get("search")) {
            API.showSearchResult(params.get("search"))
                .then(res => {
                    this.setState({ questions: res.data });
                    console.log("navbar.res.data", res.data)
                })
                .catch(err => console.log(err));
        }
        else {
            API
                .displayQuestions()
                .then(response => {
                    this.setState({ questions: response.data });
                    // console.log(this.state.questions)
                })
                .catch(err => console.log(err));
        }

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
                <div className="container">
                    {/* <OneQuestion
                    data={this.state.data}
                /> */}
                    {this.state.questions.map(question => (
                        <div key={question._id}>
                            <Link style={{color: "black"}} to={`/question/${question._id}`}>
                                <div className="card w-100 shadow-lg p-3 mb-5 bg-white rounded" style={{borderRadius: "20px"}}>
                                    <div onClick={() => this.handleClick(question._id)} className="card-body">
                                        <h4 className="card-title" style={{ fontWeight: "bolder" }}>{question.title}</h4>
                                        <p className="card-text">{question.body}</p>
                                        <p className="card-text" style={{ fontSize: "10px" }}>By {question.username} at {this.formatDate(question.date)}</p>
                                    </div>
                                </div>
                            </Link>
                            <br></br>
                        </div>
                    ))}
                    {/* <a href="#" class="btn btn-primary">Submit</a> */}
                </div>
            </div>
        )
    }
}

export default withAuth(AllQuestions);

/*



*/