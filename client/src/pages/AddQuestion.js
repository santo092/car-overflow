import React, { Component } from "react";
import { Link } from 'react-router-dom';
import API from "../utils/API";
import { Z_BLOCK } from "zlib";
import withAuth from "../components/withAuth";

class Add extends Component {

    state = {
        title: "",
        body: "",
        username: "",
    };

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        console.log(this.props.user)
        API
            .addNewQuestion(this.state.title, this.state.body, this.props.user.username)
            .then(response => {
                alert(`Added new question with the title: ${response.data.title}`)
                console.log(response);
                this.setState({
                    title: "",
                    body: "",
                });
            }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="container">
            <br></br>
                <div className="add">
                    <div className="card w-100 shadow-lg p-3 mb-5 text-white rounded" style={{ borderRadius: "20px", backgroundColor: "#4C4C4C", borderStyle: "solid", borderColor: "white", borderWidth: "6px" }}>

                        <h1>Post a new question!</h1>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder="Title of your question"
                                    onChange={this.handleInputChange}
                                    value={this.state.title}
                                />
                            </div>
                            <div className="form-group">
                                <label for="exampleFormControlTextarea1" htmlFor="title">Body</label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    name="body"
                                    placeholder="Please explain your question:"
                                    rows="4"
                                    onChange={this.handleInputChange}
                                    value={this.state.body}
                                />
                            </div>
                            <button type="submit" className="btn border border-light" style={{ backgroundColor: "#FFFF00", margin: "20px" }} onClick={this.handleFormSubmit}><Link style={{ color: "black" }} className="nav-link" to="/addquestion">Submit</Link></button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth(Add);