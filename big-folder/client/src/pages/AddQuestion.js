import React, { Component } from "react";
import API from "../utils/API";

class Add extends Component {

    state = {
        title: "",
        body: ""
    };

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = e => {
        e.preventDefault();
        API
            .addNewQuestion(this.state)
            .then(response => {
                alert(`Added new question with the title: ${response.data.name}`)
                this.setState({
                    title: "",
                    body: "",
                });
            }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="add">
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
                    <button type="submit" className="btn btn-primary" onClick={this.handleFormSubmit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default Add;