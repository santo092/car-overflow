import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import AuthService from './components/AuthService';
import withAuth from './components/withAuth';
import Add from './pages/AddQuestion'
const Auth = new AuthService();


class App extends Component {


  handleLogout = () => {
    Auth.logout();
    this.props.history.replace('/signup');
  };

  goToEditProfile = () => {
    this.props.history.replace('/profile');
  };

  // goToQuestions = () => {
  //   this.props.history.replace('/addQuestion')
  // }

  render() {
    console.log(process.env.REACT_APP_SECRET_CODE);
    return (
      // <Router>
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome {this.props.user.email}</h2>
        </div>
        <p className="App-intro">
          <button type="button" className="btn btn-primary" onClick={this.goToEditProfile}>Go to Profile</button>
          <button type="button" className="btn btn-danger" onClick={this.handleLogout}>Logout</button>
          {/* <button type="button" className="btn btn-secondary" onClick={this.goToQuestions}>Add a Question</button> */}
          {/* <Link to="/addquestion">Add Question</Link> */}
        </p>
        {/* <Route exact path="/addquestion" component={Add} /> */}
      </div>
      // </Router>
    );
  }
}

export default withAuth(App);
