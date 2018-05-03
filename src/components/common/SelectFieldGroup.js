import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const SelectFieldGroup = ({
  label,
  name,
  value,
  options,
  placeholder,
  closeOnSelect,
  onChange
}) => {
  const optionsArr = [];

  for (let key in options) {
    const obj = {};
    obj.value = options[key];
    obj.label = key;
    optionsArr.push(obj);
  }

  return (
    <div className="form-group">
      <label className="control-label">{label}</label>
      <Select
        name={name}
        value={value}
        options={optionsArr}
        placeholder={placeholder}
        multi={multi}
        onChange={value => {
          onChange(value);
        }}
      />
    </div>
  );
};

SelectFieldGroup.propTypes = {
  label: React.PropTypes.string.isRequired,
  name: React.PropTypes.string,
  value: React.PropTypes.string.isRequired,
  options: React.PropTypes.object.isRequired,
  placeholder: React.PropTypes.string,
  closeOnSelect: React.PropTypes.bool,
  removeSelected: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  onChange: React.PropTypes.func.isRequired
};

export default SelectFieldGroup;
