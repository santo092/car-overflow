import React, { Component } from 'react';
import API from '../utils/API';
class OneQuestion extends Component {
    state = {
        title: "",
        body: "",
        reply: []
    }
    componentDidMount() {
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
    render() {
        return (
            <div>
                <div className="card w-75">
                    <div className="card-body">
                        <h5 className="card-title">{this.state.title}</h5>
                        <p className="card-text">{this.state.body}</p>
                        <p className="card-text">
                        {this.state.reply.map(reply => (reply))}
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}
export default OneQuestion;