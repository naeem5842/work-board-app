import React from "react";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import "./InProgressPane.css";

function InProgressPane(prop) {
  return (
    <MDBCol md='4' className="border-end border-3 p-0">
    <div className="text-center">
    <div className="border border-3 border-warning rounded-3 d-inline-block align-items-center justify-content-center m-3 px-4">
      <h1 className="mb-0">In Progress</h1>
    </div>
      {prop.children}
    </div>

    </MDBCol>
  );
}

export default InProgressPane;
