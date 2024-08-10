import React from "react";

const TimeLoader = ({ children, loading = true }) => {
  return loading ? (
    <div className="side-loader-container">
      <span className="loader">
        <span className="loader-inner"></span>
      </span>
    </div>
  ) : children;
};

export default TimeLoader;