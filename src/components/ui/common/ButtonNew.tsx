import React from "react";
import "../style//ButtonNew.scss";

const ButtonNew = () => {
  return (
    <button className="btn" aria-label="Get started">
      <span className="content">
        <svg
          className="icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M5 12h11"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M13 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Add Tool</span>
      </span>
      <span className="badge">New</span>
    </button>
  );
};

export default ButtonNew;
