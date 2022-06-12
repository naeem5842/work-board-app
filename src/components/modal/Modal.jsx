import React, { useState } from "react";
import "./Modal.css";
import { v4 as uuid } from "uuid";

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
      title: "",
      description: "",
    });
    event.preventDefault();
    prop.onClickOverlay();
  }

  return (
    <div className="modal">
      <div className="overlay">
        <div className="modal-content">
          <form>
            <input
              name="title"
              type="text"
              onChange={handleChange}
              value={task.title}
              placeholder="Enter the Title"
            ></input>
            <br></br>
            <input
              name="description"
              type="text"
              onChange={handleChange}
              value={task.description}
              placeholder="Enter The description"
            ></input>
            <br></br>

            <button className="btn-modal" onClick={handleAdd}>
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Modal;
