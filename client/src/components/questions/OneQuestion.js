import React, { Component } from 'react';
import API from '../../utils/API';
import withAuth from "./../withAuth";
import moment from 'moment';

class OneQuestion extends Component {


    state = {
        title: "",
        body: "",
        reply: [],
        inputReply: ""
    }

    componentDidMount() {
        document.getElementsByTagName("body")[0].style.height = "100%";
        console.log(this.props.user);
        this.getAllReplies();
    }

    componentWillUnmount() {
        document.getElementsByTagName("body")[0].style.height = "100vh";
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
        document.getElementsByTagName("body")[0].style.height = "100%";
        e.preventDefault();
        API
            .addNewReply(this.props.match.params.id, this.state.inputReply, this.props.user.username)
            .then(response => {
                console.log(response.data);
                this.getAllReplies();
            })
        console.log(this.state);
    }

    formatDate = (date) => {
        let formatDate = moment(date).format('MMMM Do YYYY, h:mm:ss a');
        console.log(formatDate);
        return formatDate;
    }

    render() {

        const style = {
            fontSize: "7px"
        }
        return (
            <div className="container">
                <div className="card w-100 shadow-lg p-3 mb-5 text-white rounded" style={{ borderRadius: "20px", backgroundColor: "#4C4C4C", borderStyle: "solid", borderColor: "white", borderWidth: "6px" }}>
                    <div className="card-body">
                        <h2 className="card-title">{this.state.title}</h2>
                        <h5 className="card-text">{this.state.body}</h5>
                        <br></br>
                        {this.state.reply.map(reply => (
                            <div>
                                <div className="card w-100 shadow-lg p-3 mb-5 text-dark bg-white rounded">
                                    <div className="card-body" style={{ padding: "10px" }}>
                                        <p>Reply: {reply.reply}</p>
                                        <p>Username: {reply.username}</p>
                                        <hr></hr>
                                        <p style={style}>{this.formatDate(reply.date)}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <br></br>
                        <form>
                            <input
                                type="text"
                                className="form-control"
                                name="inputReply"
                                placeholder="Reply:"
                                onChange={this.handleInputChange} />
                            <br></br>
                            <button type="submit" className="btn border border-light" style={{ backgroundColor: "#FFFF00" }} onClick={this.handleFormSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default withAuth(OneQuestion);

