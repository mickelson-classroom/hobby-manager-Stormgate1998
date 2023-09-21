import React, { useState } from 'react';
import ErrorBoundary from '../ErrorBoundary';
import Navbar from '../NavBar';

export const ErrorPage = () => {

  return (
    <div>
      <Navbar />
      
        <div>
          <h2 className="text-success">Click Button To Set Off Error</h2>
          <ErrorBoundary
        fallback={<h3 className="text-warning">You have encountered an error. Please go to home.</h3>}
      ><button
            className="btn btn-secondary my-3"
            onClick={() => {
                  throw new Error("This is a deliberate error.");
            }}
          >
            Trigger Error
          </button>
          </ErrorBoundary>
        </div>
      
    </div>
  );
};
