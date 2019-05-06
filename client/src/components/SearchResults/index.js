import React from "react";

function SearchResults(props) {
  return (
    <div>
      {/* <pre>{JSON.stringify(props, null, 2)}</pre> */}
     
     <div class="card" >
        <ul class="list-group list-group-flush">
          <li class="list-group-item"><p>Make: {props.results.make}</p></li>
          <li class="list-group-item"><p>Model: {props.results.model}</p></li>
          <li class="list-group-item"><p>Year: {props.results.year}</p></li>
          <li class="list-group-item"><p>Mileage: {props.results.mileage}</p></li>

          <li class="list-group-item"><p>Model: {props.state}</p></li>
          <li class="list-group-item"><p>Year: {props.results.year}</p></li>
        </ul>
      </div>


    </div>
  );
}

export default SearchResults;
