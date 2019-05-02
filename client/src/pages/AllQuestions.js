import React, { Component } from 'react';
import API from '../utils/API';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import OneQuestion from "./OneQuestion";
// import { Link } from 'react-router-dom';


class AllQuestions extends Component {

    state = {
        questions: [],
        data: {}
    };

    //If questions is empty, we will show one question with details

    componentDidMount() {
        //Returns a string of query parameters using a search
        let params = new URLSearchParams(this.props.location.search);
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

    render() {
        return (
            <div className="questions">
                {this.state.questions.map(question => (
                    <div key={question._id}>
                        <div className="card w-75">
                            <div onClick={() => this.handleClick(question._id)} className="card-body">
                                <h5 className="card-title">{question.title}</h5>
                                <p className="card-text">{question.body}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <a href="#" class="btn btn-primary">Submit</a> */}
                <OneQuestion
                    data={this.state.data}
                />
            </div>
        )
    }
}

export default AllQuestions

/*



*/