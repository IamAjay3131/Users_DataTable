import React, { useState } from "react";

interface SearchBarProps {
  onSearch:(searchText:string)=>void;
}

const Search: React.FC<SearchBarProps> = ({onSearch }) => {

  const[state,setState]=useState('');

  const handleClick = (event:React.FormEvent) => {
    event.preventDefault();
    onSearch(state);
  };
 
  return (
    <div className="container w-50">
      <form>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name..."
            aria-label="Search"
            value={state}
            onChange={(event) => setState(event.target.value)}
          />
          <button className="btn btn-primary" type="submit" onClick={handleClick}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default Search;
