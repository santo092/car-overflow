import React from "react";
import "./style.css";

// components/Carform /index.js

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
  return (
    <div className="jumbotron" style={{ backgroundColor: "#4C4C4C", color: "white", borderStyle: "solid", borderColor: "white", borderWidth: "6px"}}>
      <h1 className="text-center">Car Maintenance</h1>
      <form className="search" style={{width: "90%"}}>
        <div className="form-group">
          <h3 htmlFor="car">Car Information:</h3>
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

          <button type="submit" onClick={props.handleFormSubmit} className="btn border border-light" style={{ backgroundColor: "#FFFF00" }}>
            Search
        </button>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
