import React from 'react';

export default function Spinner() {
  return <>
    <div className="spinner" aria-label="Loading"></div>

    <style jsx>{`
      .spinner {
        border: 5px solid transparent;
        border-top: 5px solid #6851ff;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </>
}
