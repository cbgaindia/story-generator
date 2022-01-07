import React from 'react';

const Dropdown = (props) => (
  <>
    <label className="screen-reader-text" htmlFor="custom_select">
      {props.heading}
    </label>
    <select
      id="custom_select"
      className="select-comp"
      onChange={props.handleDropdownChange}
    >
      {props.options.map((option, index) => (
           <option key={`dropdown-${index}`} selected={option == props.selectedYear}>{option}</option>

      ))}
    </select>
  </>
);

export default Dropdown;
