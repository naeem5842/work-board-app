import React from "react";
import {
  MDBBtn,
 
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

function DeletePopup(props) {
  function handleDeleteClick() {
    props.onDelete();
    
  }

  function toggleShow(){
    props.toggledelete();
  }

  return (
  

        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Delete Task</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
             <h1>Are You Sure?</h1>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn onClick={handleDeleteClick}>Yes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>

  );
}

export default DeletePopup;
