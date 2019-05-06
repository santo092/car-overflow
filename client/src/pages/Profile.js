import React, { Component } from 'react';
import withAuth from './../components/withAuth';
import API from './../utils/API';
import SearchForm from "../components/SearchForm";
import SearchResults from "../components/SearchResults";
import Header from "../components/Header";

class Search extends Component {
  state = {
    year: "",
    make: "",
    model: "",
    mileage: "",
    results: [],
    error: ""
  };

  // When the component mounts, get a list of all available base breeds and update this.state.breeds
  componentDidMount() {
    // this.setState({
    //   mileage: "80000",
    //   year: "2011",
    //   make: "toyota",
    //   model: "corolla"
    // })
    API.getCarDetails()
      .then(res => console.log(res.data))
      .catch(err => console.log(err));

  }

  componentWillUnmount() {
    document.getElementsByTagName("body")[0].style.height = "100vh";
  }

  handleInputChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  handleFormSubmit = event => {
    document.getElementsByTagName("body")[0].style.height = "200vh";
    event.preventDefault();
    API.getCarDetails(
      this.state.year,
      this.state.make,
      this.state.model,
      this.state.mileage)
      .then(res => {
        console.log(res.data)
        this.setState({ results: res.data.data }, () => console.log(this.state.results))
        //  this.setState({ results: res.data.message, error: ""});
      })
      .catch(err => this.setState({ error: err.message }));

  };

  render() {
    return (
      <div className="container" id="holder">
        <SearchForm
          handleFormSubmit={this.handleFormSubmit}
          handleInputChange={this.handleInputChange}
        // car={this.state.car}
        />
        {/* <SearchResults results={this.state} /> */}
        {this.state.results.map(maintenence => (
          <div key={maintenence.desc} className="card w-100 shadow-lg p-3 mb-5 bg-white rounded">
            <div className="card-body">
              <h3 className="card-title">Maintenance: {maintenence.desc}</h3>
              <p className="card-text">Due at {maintenence.due_mileage} miles.</p>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Search;
