import React, { useState } from "react";
import {
  MDBCard,
  MDBTypography
} from 'mdb-react-ui-kit';


function StickyNote(prop) {
  const [showOptins, setShowOptions] = useState(false);
  const [clickPoint, setClickPoint] = useState({
    x: 0,
    y: 0,
  });

  const [secOption, setSecOption] = useState(false);

  const [disabled, setDisabled] = useState({
    todo: true,
    inprogress: true,
    done: true,
  });

  function showOptions(event) {
    setShowOptions(!showOptins);
    setClickPoint({
      x: event.pageX,
      y: event.pageY,
    });
    event.preventDefault();
  }

  function showSecMenu() {
    handleDisabled();
    setShowOptions(true);
    setSecOption(true);
  }

  function closeSecMenu() {
    setSecOption(false);
  }

  function handleSecMenuClick(event) {
    setShowOptions(false);
    prop.onSecMenuClick(prop.id, event);
  }

  function handleDisabled() {
    setDisabled((prevValue) => {
      return {
        ...prevValue,
        [prop.position]: false,
      };
    });
  }

  function handleDelete() {
    prop.onClickDelete(prop.id);
    setShowOptions(false);
  }


  return (
    <> 
      <MDBCard className="m-4 w-auto" onContextMenu={showOptions}>
      <div className="note note-warning text-start" >
      <MDBTypography className="h4 m-0 "> {prop.title} </MDBTypography>
      <MDBTypography className="p m-0 "> {prop.description} </MDBTypography>

      </div>
       
      
      </MDBCard>
      

      {showOptins && (
        <div
          className="contextMenu"
          style={{
            left: clickPoint.x,
            top: clickPoint.y,
          }}
        >
          <div className="pri-contextmenu">
            <ul>
              <li onMouseOver={showSecMenu} onMouseLeave={closeSecMenu}>
                Send To
              </li>
              <li onClick={handleDelete}>Delete</li>
            </ul>
          </div>

          {secOption && (
            <div
              onMouseEnter={showSecMenu}
              onMouseLeave={closeSecMenu}
              className="sec-contextmenu"
            >
              <ul>
                {disabled.todo && (
                  <li value="1" onClick={handleSecMenuClick}>
                    To Do
                  </li>
                )}
                {disabled.inprogress && (
                  <li value="2" onClick={handleSecMenuClick}>
                    In Progress
                  </li>
                )}
                {disabled.done && (
                  <li value="3" onClick={handleSecMenuClick}>
                    Done
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default StickyNote;
