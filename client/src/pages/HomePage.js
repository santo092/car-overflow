import React, { Component } from "react";
import { Link } from 'react-router-dom';

class HomePage extends Component {
    componentDidMount() {

    }

    render() {
        return (
            <div className="container">
                <div className="jumbotron" style={{backgroundColor: "#4C4C4C", color: "white", borderStyle: "solid", borderColor: "white", borderWidth: "6px"}}>
                    <h1 style={{textAlign: "center", borderStyle: "outset", borderColor: "#FFFF00", padding: "5px", borderWidth: "6px"}}>Welcome to the Car Query Forum!</h1>
                    <hr style={{backgroundColor: "white"}}></hr>
                    <ul>
                        <li><h4>Go to <Link to="/profile">My Car</Link> to learn about the maintenance your car requires.</h4></li>
                        <br></br>
                        <li><h4>Go to <Link to="/addquestion">Add Question</Link> to post a question about a car problem you are having.</h4></li>
                        <br></br>
                        <li><h4>Go to <Link to="/allquestions">All Questions</Link> to view all posted questions. You can also click on a question to post a reply!</h4></li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default HomePage;