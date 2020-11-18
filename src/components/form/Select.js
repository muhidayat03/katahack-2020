import React from "react";
import { bool } from "prop-types";
import Select from "react-select";

const colourStyles = {
  control: (style, state) => {
    return {
      ...style,
      fontSize: 14,
      color: "#313f4e",

    };
  },
  menu: (base) => ({
    ...base,
    fontSize: 14,
    color: "#313f4e",

  }),
  menuList: (base) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
  }),
  input: (styles) => {
    return {
      ...styles,
      "& input": {
        font: "inherit",
      },
    };
  },
  placeholder: (styles) => ({
    ...styles,
    fontSize: 14,
    color: "#313f4e",
    opacity: 0.68, 
    padding: "9px 8px",

  }),
  singleValue: (styles, { data }) => ({
    ...styles,
    // fontFamily: "lato",
    color: "#313f4e",
    fontSize: 14,
    padding: "9px 8px",

  }),
};

const SelectComponent = (props) => (
  <Select
    isClearable={props.isClearable}
    styles={{ ...colourStyles }}
    {...props}
  />
);

SelectComponent.propsTypes = {
  isClearable: bool,
};
SelectComponent.defaultProps = {
  isClearable: true,
};

export default SelectComponent;
