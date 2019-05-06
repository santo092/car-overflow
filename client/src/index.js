import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import registerServiceWorker from './registerServiceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import axios from "axios";

// Our Components
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Add from "./pages/AddQuestion";
import AllQuestions from './pages/AllQuestions';
import OneQuestion from "./components/questions/OneQuestion";
import HomePage from './pages/HomePage';

// Here is if we have an id_token in localStorage
if(localStorage.getItem("id_token")) {
  // then we will attach it to the headers of each request from react application via axios
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('id_token')}`;
}

ReactDOM.render(
    <Router>
        <div>
            <Route component={Navbar} />
            <Route exact path="/homepage"component={HomePage} />
            <Route exact path="/" component={HomePage} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/addquestion" component={Add} />
            <Route exact path="/allquestions" component={AllQuestions} />
            <Route exact path="/onequestion" component={OneQuestion} />
            <Route path="/question/:id" component={OneQuestion} />
            <Route exact path="/allquestions/:search" component={AllQuestions} />
        </div>
    </Router>
    ,document.getElementById('root')
);
registerServiceWorker();
