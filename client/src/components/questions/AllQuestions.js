import React from 'react';

function AllQuestions(props) {

    return (

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

    )
}