import React from "react";

const Alert = ({ message, className="" }) => {
  return (
    <div
      className={`${className} p-4 border-s-4`}
      role="alert"
    >
      <div className="flex">
        <div className="ms-3">
          <p className="text-sm text-gray-700 dark:text-gray-400 text-center">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Alert;
