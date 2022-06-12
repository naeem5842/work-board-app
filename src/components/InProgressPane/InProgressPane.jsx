import React from "react";
import "./InProgressPane.css";

function InProgressPane(prop) {
  return (
    <div className="inprogress-pane container">
      <h1>In Progress</h1>
      {prop.children}
    </div>
  );
}

export default InProgressPane;
