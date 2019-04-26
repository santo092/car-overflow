import React, { Component } from 'react';
import API from '../utils/API';
// import { Link } from 'react-router-dom';

class AllQuestions extends Component {

    state = {
        title: "",
        body: "",
    };

    componentDidMount() {
        API
        .getAllQuesions()
        .then(res => this.setState({ }))
    }
}