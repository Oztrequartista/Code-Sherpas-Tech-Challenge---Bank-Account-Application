import React from "react";
import Select, { components } from "react-select";
import EntityImage from "@/features/entity-image";

const ReactSelect = ({
  selectWrapperClasses = "",
  label = "",
  labelStyles = "",
  isSearchable = true,
  required = false,
  placeholder = "Search and select an option",
  formatOptionLabel, // you can override the default format function
  value,
  options = [{ value: "selectAnOption", label: "selectAnOption" }],
  defaultValue,
  controlStylesOveride = {},
  optionStylesOveride = {},
  indicatorStylesOveride = {},
  icon = null, // Add icon prop with default value as null
  onChange = () => {},
  showFlags = false, // Add prop to toggle flag display
  ...props
}) => {
  const customStylesOne = {
    control: (base, state) => ({
      ...base,
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: "normal",
      color: "#95969b",
      border: "1px solid #e5e5e5",
      borderRadius: "4px",
      textAlign: "left",
      cursor: "pointer",
      position: "relative",
      display: "flex",
      alignItems: "center",
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        outline: state.isFocused ? 0 : 0,
      },
      ...controlStylesOveride,
    }),
    option: (provided, state) => ({
      ...provided,
      zIndex: 9999, // Ensure the options are above other elements
      backgroundColor: state.isSelected ? "#234BDB" : "white",
      color: state.isSelected ? "white" : "#191A1E",
      fontSize: "14px",
      lineHeight: "20px",
      fontWeight: "normal",
      borderRadius: "4px",
      "&:hover": {
        backgroundColor: state.isSelected ? "#152E96" : "#E2E7FB",
        color: state.isSelected ? "white" : "#191A1E",
        cursor: "pointer",
      },
      ...optionStylesOveride,
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Ensure the menu is above other elements
    }),
    indicatorSeparator: () => ({ display: "none" }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#e5e5e5",
      borderLeft: "1px solid #e5e5e5",
      ...indicatorStylesOveride,
    }),
    placeholder: (provided, state) => ({
      ...provided,
      color: "#95969A",
      fontSize: "14px",
      fontWeight: "400",
    }),
  };

  const CustomControl = ({ children, ...props }) => (
    <components.Control {...props}>
      {icon && <span style={{ marginLeft: 16 }}>{icon}</span>}
      {children}
    </components.Control>
  );

  const defaultFormatOptionLabel = ({ label, flag }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {showFlags && flag && (
        <EntityImage
          entityName={label}
          src={flag}
          className="bg-primary-100 text-primary-600 text-body_sm1_normal w-[30px] h-[30px] flex items-center justify-center rounded-full"
        />
      )}
      <span>{label}</span>
    </div>
  );

  return (
    <div>
      {label ? (
        <label className={`text-body_sm2_normal block mb-2 ${labelStyles}`}>
          {label}
        </label>
      ) : null}
      <div className={selectWrapperClasses}>
        <Select
          required={required}
          components={{ Control: CustomControl }}
          options={options}
          value={value}
          defaultValue={defaultValue}
          styles={customStylesOne}
          onChange={onChange}
          formatOptionLabel={formatOptionLabel || defaultFormatOptionLabel} // Use custom or default format function
          isSearchable={isSearchable}
          placeholder={placeholder}
          {...props}
        />
      </div>
    </div>
  );
};

export default ReactSelect;
