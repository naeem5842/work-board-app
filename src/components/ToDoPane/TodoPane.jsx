import React, { useState } from "react";
import "./ToDoPane.css";

function TodoPane(prop) {
  const [point, setPoint] = useState({
    x: 0,
    y: 0,
  });

  const [showMenu, setShowMenu] = useState(false);

  function openMenu(event) {
    setShowMenu((prevValue) => !prevValue);
    setPoint({
      x: event.pageX,
      y: event.pageY,
    });

    event.preventDefault();
  }

  function onClickNewTask() {
    prop.handlModal();
    setShowMenu(false);
  }

  return (
    <>
      <div className="todo-pane container">
        <div onContextMenu={openMenu}>
          <h1>To Do</h1>
        </div>

        {prop.children}
      </div>

      {showMenu ? (
        <div
          className="Menu"
          style={{
            top: point.y,
            left: point.x,
          }}
        >
          <ul>
            <li onClick={onClickNewTask}>New Task</li>
          </ul>
        </div>
      ) : null}
    </>
  );
}

export default TodoPane;
