import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../NavBar";
import ErrorBoundary from "../ErrorBoundary";

export const ErrorFeedback = () => {
  return (
    <>
      <Navbar />
      <h2 className="text-warning">You have encountered an error. Please go to home.</h2>
    </>
  );
};
