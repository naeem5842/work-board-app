import React, { useState } from "react";
import "./Modal.css";
import { v4 as uuid } from "uuid";

import {
  MDBBtn,
  MDBInput,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';

function Modal(prop) {
  const unique_id = uuid();

  const [task, setTask] = useState({
    id: unique_id,
    title: "",
    description: "",
    position: "todo",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setTask((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  function handleAdd(event) {
    prop.onAdd(task);
    setTask({
      id: unique_id,
      title: "",
      description: "",
      position: "todo",
    });
    prop.toggleShow();
  }


  const toggleShow = () => {
    prop.toggleShow();

  }

  return (
    <>
       <MDBModalDialog centered>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Add a New Task</MDBModalTitle>
            <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBInput 
            className="mb-3"
            name="title" 
            label='Title' 
            onChange={handleChange} 
            type ="text" 
            value={task.title}  />

            <MDBInput 
            name = "description" 
            label ="Description" 
            onChange={handleChange} 
            type ="text" 
            value={task.description} />

        
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color='secondary' onClick={toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn onClick={handleAdd}>Save changes</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>

    </>

  );
}

export default Modal;


