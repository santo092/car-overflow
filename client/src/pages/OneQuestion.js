import React from 'react';


function OneQuestion(props) {

    let replies = null

    if (props.data.reply) {
        replies = props.data.reply.map(reply => (
            <div className="card w-75">
                <div className="card-body">
                    <p key={props.data._id} className="card-text">{reply.body}</p>
                    <p style={{'font-size': '8px'}} className="card-text">{reply.date}</p>
                </div>
            </div>
        ))
    }
    return (
        <div>
            <div className="card w-75">
                <div className="card-body">
                    <h5 className="card-title">{props.data.title}</h5>
                    <p className="card-text">{props.data.body}</p>
                </div>
            </div>
            {replies}
        </div>
    );
}

export default OneQuestion;

