import React, { Component } from 'react';
import API from '../utils/API';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import OneQuestion from "../components/questions/OneQuestion";
import { Link } from 'react-router-dom';
import withAuth from './../components/withAuth';
import moment from 'moment'
import { appendFile } from 'fs';



class AllQuestions extends Component {

    state = {
        questions: [],
        data: {},
        searchQuestion: [],
    };

    //If questions is empty, we will show one question with details

    componentDidMount() {
        document.getElementsByTagName("body")[0].style.height="100%";

        //Returns a string of query parameters using a search
        //console.log(this.props);
        let params = new URLSearchParams(this.props.history.location.search);
        // console.log("Stuff", params.get("search"))
        if (params.get("search")) {
            API.showSearchResult(params.get("search"))

                .then(res => {

                    this.setState({ searchQuestion: res.data });



                    // console.log("navbar.res.data", res.data);


                })
                .catch(err => console.log(err));

            API
                .displayQuestions()
                .then(response => {
                    this.setState({ questions: response.data });
                    // console.log(this.state.questions)
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

    };


    componentWillReceiveProps(nextProps) {
        let params = new URLSearchParams(nextProps.history.location.search);
        
            API.showSearchResult(params.get("search"))
                .then(res => {
                    this.setState({ searchQuestion: res.data });
                })
                .catch(err => console.log(err));
    }

    componentWillUnmount() {
        document.getElementsByTagName("body")[0].style.height="100vh";
    }

    componentWillUnmount() {
        document.getElementsByTagName("body")[0].style.height="100vh";
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

                    {this.state.searchQuestion.map(searchQuestion => (

                        <div key={searchQuestion._id}>
                            <h2>Search Result</h2>

                            <Link style={{ color: "black" }} to={`/question/${searchQuestion._id}`}>
                                <div className="card w-100 shadow-lg p-3 mb-5 bg-white rounded" style={{ borderRadius: "20px" }}>
                                    <div onClick={() => this.handleClick(searchQuestion._id)} className="card-body">
                                        <h3 className="card-title" style={{ fontWeight: "bolder" }}>{searchQuestion.title}</h3>
                                        <h6 className="card-text">{searchQuestion.body}</h6>
                                        <hr></hr>
                                        <p className="card-text" style={{ fontSize: "12px" }}>By {searchQuestion.username} at {this.formatDate(searchQuestion.date)}</p>
                                    </div>
                                </div>
                            </Link>

                        </div>
                    ))}
                    {/* All the posts */}
                    <h1>Car Query Forum</h1>
                    {this.state.questions.map(question => (
                        <div key={question._id}>

                            <Link style={{ color: "black" }} to={`/question/${question._id}`}>
                                <div className="card w-100 shadow-lg p-3 mb-5 bg-white rounded" style={{ borderRadius: "20px" }}>
                                    <div onClick={() => this.handleClick(question._id)} className="card-body">
                                        <h3 className="card-title" style={{ fontWeight: "bolder" }}>{question.title}</h3>
                                        <h6 className="card-text">{question.body}</h6>
                                        <hr></hr>
                                        <p className="card-text" style={{ fontSize: "12px" }}>By {question.username} at {this.formatDate(question.date)}</p>
                                    </div>
                                </div>
                            </Link>

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