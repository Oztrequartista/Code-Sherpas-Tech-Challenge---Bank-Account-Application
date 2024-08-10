import React, { useState, useEffect } from "react";

const CenteredModal = ({
  title = "",
  show,
  onClose,
  children,
  titleClassName = "",
  modalContainerClass = "",
  hrClassName = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300); // Duration of the transition
    }
  }, [show]);

  if (!isVisible && !show) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 transition-opacity duration-300 z-20 ${
        show ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-sm p-6 w-full max-w-md mx-4 transform transition-transform duration-300 ${modalContainerClass} ${
          show ? "scale-100" : "scale-90"
        }`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className={`mb-4 text-neutral-900 capitalize ${titleClassName}`}>{title}</h2>
        <hr className={`border-neutral-50 mb-4 ${hrClassName}`} />
        {children}
      </div>
    </div>
  );
};

export default CenteredModal;
