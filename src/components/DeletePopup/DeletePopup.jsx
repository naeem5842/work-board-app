import React from "react";



function DeletePopup(props){


   function handleDeleteClick(){
        props.onDelete();
   }
    return(
        <div className="modal">
        <div className="overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete the task?</h3>
              <button className="btn-modal" onClick={handleDeleteClick}>Delete</button>
          </div>
        </div>
      </div>
    );
}

export default DeletePopup;