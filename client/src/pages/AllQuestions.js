import React, { Component } from 'react';
import API from '../utils/API';
// import { Link } from 'react-router-dom';

class AllQuestions extends Component {

    state = {
        questions: []
    };

    componentDidMount() {
        API
            .displayQuestions()
            .then(response => {
                this.setState({ questions: response.data });
                console.log(this.state.questions)
            })
            .catch(err => console.log(err));

    }


    render() {
        return (
            <div className="questions">
                {this.state.questions.map(question => (
                    <div>
                        <div className="card w-75">
                            <div className="card-body">
                                <h5 className="card-title">{question.title}</h5>
                                <p className="card-text">{question.body}</p>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <a href="#" class="btn btn-primary">Submit</a> */}
            </div>
        )
    }
}

export default AllQuestions