import React from "react";
// import "./style.css";

// components/Carform /index.js

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
  return (
    <form className="search">
      <div className="form-group">
        <label htmlFor="car">Car Information:</label>
        <input
          value={props.year}
          onChange={props.handleInputChange}
          name="year"
          type="text"
          className="form-control"
          placeholder="Enter your vehicle's year of make"
          id="year"
        />

        <input
          value={props.make}
          onChange={props.handleInputChange}
          name="make"
          type="text"
          className="form-control"
          placeholder="Enter your vehicle's make"
          id="make"
        />

        <input
          value={props.model}
          onChange={props.handleInputChange}
          name="model"
          type="text"
          className="form-control"
          placeholder="Enter your vehicle's model"
          id="model"
        />
          <input
          value={props.mileage}
          onChange={props.handleInputChange}
          name="mileage"
          type="text"
          className="form-control"
          placeholder="Enter your vehicle's mileage"
          id="mileage"
        />

        <button type="submit" onClick={props.handleFormSubmit} className="btn btn-success">
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
