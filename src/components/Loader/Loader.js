import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <h4>Fetching Data ...</h4>
    </div>
  );
};

export default Loader;
