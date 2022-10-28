import React from "react";
import "./DonePane.css";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
function DonePane(prop) {
  return (
    <MDBCol md='4' className=" p-0 min-vh-100">
    
    <div className="text-center">
    <div className="border border-3 border-success rounded-3 d-inline-block align-items-center justify-content-center m-3 px-4">
      <h1 className="mb-0">Done!</h1>
    </div>
      {prop.children}
    </div>

    </MDBCol>
  );
}

export default DonePane;
