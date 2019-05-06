import React, { Component } from "react";
import { Link } from 'react-router-dom';
import AuthService from '../AuthService';
import SearchField from 'react-search-field';
import API from '../../utils/API';


class Navbar extends Component {
    constructor() {
        super();
        this.Auth = new AuthService();
    }

    handleSearch = (value) => {
        // API.showSearchResult(value)
        // .then(res =>
        //     console.log("navbarres.data", res.data)
            
        //   )
        //   .catch(err => console.log(err));


        //Navigates to allquestions route
        this.props.history.push("/allquestions?search=" + value)

        
    

    }

    showNavigation = () => {
        console.log('Navbar: checking if logged in', this.Auth.loggedIn())
        if (this.Auth.loggedIn()) {
            return ( <span>
                <ul className="navbar-nav">
                    <li>
                        <Link className="nav-link" to="/addquestion">Add Question</Link>
                    </li>
                    <li>
                        <Link className="nav-link" to="/allquestions">All Questions</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/profile">My car</Link>
                    </li>
                    <li className="nav-item">
                        {/* this is not using the Link component to logout or user and then refresh the application to the start */}
                        <a className="nav-link" href="/" onClick={() => this.Auth.logout()}>Logout</a>
                    </li>
                </ul></span>
            );
        } else {
            return (
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/signup">Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/login">Login</Link>
                    </li>
                </ul>
            );
        }
    };

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">

                <div className="container">

                    <Link className="navbar-brand" to="/homepage"><i style={{color: "#FFFF00"}} className="fas fa-car"></i></Link>
                    {/*  Our searchbar */}
                    <SearchField classNames="searchbar"
                        placeholder="Search for a Question"
                        onSearchClick={this.handleSearch}
                    />
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse menu-bar" id="navbarNav">
                        <ul className="navbar-nav mr-auto">



                        </ul>
                        {this.showNavigation()}
                    </div>

                </div>
            </nav>
        )
    }
}

export default Navbar;