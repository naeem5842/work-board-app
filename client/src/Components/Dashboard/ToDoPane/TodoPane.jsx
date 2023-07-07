import React, { useState } from "react";
import {
  MDBCol,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";

function TodoPane(prop) {
  //   const [point, setPoint] = useState({
  //     x: 0,
  //     y: 0,
  //   });

  const [showMenu, setShowMenu] = useState(false);

  // function openMenu(event) {
  //   setShowMenu((prevValue) => !prevValue);
  //   setPoint({
  //     x: event.pageX,
  //     y: event.pageY,
  //   });

  //   event.preventDefault();
  // }

  function onClickNewTask() {
    prop.handleModal();
    setShowMenu(false);
  }

  return (
    <>
      <MDBCol md="4" className="border-end border-3 p-0" alignment="center">
        {/* <MDBCard alignment='center'> */}
        {/* <div onContextMenu={openMenu}>
      
      </div> */}
        <div className="text-center h-100">
          <MDBDropdown group className="shadow-0" animation={false}>
            <div className="border border-3 border-danger rounded-3 d-flex align-items-center justify-content-center m-3 ps-4">
              <h1 className="mb-0">To Do</h1>

              <MDBDropdownToggle color="link" className=""></MDBDropdownToggle>
            </div>

            <MDBDropdownMenu>
              <MDBListGroup style={{ minWidthL: "22rem" }} light>
                <MDBListGroupItem
                  className="ps-2 py-2 rounded-2 border"
                  onClick={onClickNewTask}
                >
                  Add a Task
                </MDBListGroupItem>
              </MDBListGroup>
            </MDBDropdownMenu>
          </MDBDropdown>

          {/* <div onContextMenu={openMenu} >
          <h1 className='mb-3 mt-3'>Heading</h1>
        </div> */}

          {prop.children}
        </div>

        {/* {showMenu ? (
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
      </MDBCard> */}
      </MDBCol>
    </>
  );
}

export default TodoPane;
