import React from 'react';

const Filter = ({ handleChange }) => {
  return (
    <>
      <label htmlFor="filter" className="filter-label">
        Find contacts by name
      </label>
      <input
        type="text"
        name="filter"
        className="filter-input"
        onChange={handleChange}
      />
    </>
  );
};

export default Filter;
