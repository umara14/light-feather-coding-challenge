import React from "react";

export default function AlertMessage({ message, error }) {
  return (
    <div className="alert-msg-container">
      <p className={`alert-msg ${error ? "error-msg" : "success-msg"}`}>
        {message}
      </p>
    </div>
  );
}
