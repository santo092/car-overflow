import React, { Component } from 'react';
import API from '../../utils/API';
import withAuth from "./../withAuth";

class OneQuestion extends Component {


    state = {
        title: "",
        body: "",
        reply: [],
        inputReply: ""
    }

    componentDidMount() {
        console.log(this.props.user);
        this.getAllReplies();
    }

    getAllReplies = () => {
        API
            .displayOneQuestion(this.props.match.params.id)
            .then(res => {
                console.log(res.data);
                this.setState({
                    title: res.data.title,
                    body: res.data.body,
                    reply: res.data.reply || []
                })
            })
    }

    handleInputChange = e => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleFormSubmit = e => {
        e.preventDefault();
        API
            .addNewReply(this.props.match.params.id, this.state.inputReply, this.props.user.username)
            .then(response => {
                alert(`Added new reply with the body: ${response.data.body}`)
                console.log(response.data);
                this.getAllReplies();
            })
        console.log(this.state);
    }

    render() {

        const style = {
            fontSize: "7px"
        }
        return (
            <div>
                <div className="card w-75">
                    <div className="card-body">
                        <h5 className="card-title">{this.state.title}</h5>
                        <p className="card-text">{this.state.body}</p>
                        {this.state.reply.map(reply => (
                            <div className="card w-75">
                                <div className="card-body">
                                    <p>{reply.reply}</p>
                                    <p>Username: {reply.username}</p>
                                    <p style={style}>{reply.date}</p>
                                </div>
                            </div>
                        ))}
                        <br></br>
                        <form>
                            <input
                                type="text"
                                className="form-control"
                                name="inputReply"
                                onChange={this.handleInputChange} />
                            <button type="submit" onClick={this.handleFormSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth(OneQuestion);

