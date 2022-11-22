import React, { useState } from "react";
import TodoPane from "../ToDoPane/TodoPane.jsx";
import InProgressPane from "../InProgressPane/InProgressPane.jsx";
import DonePane from "../DonePane/DonePane.jsx";
import Modal from "../modal/Modal.jsx";
import StickyNote from "../StickeyNote/StickyNote.jsx";
import DeletePopup from "../DeletePopup/DeletePopup.jsx";
import Header from "../Header/Header.jsx";
import { MDBRow, MDBModal } from 'mdb-react-ui-kit';
import "./App.css"

function App() {
  // const [modelShow, setModelShow] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  const [centredModal, setCentredModal] = useState(false);
  const toggleShow = () => setCentredModal(!centredModal);
  const toggledelete = () => setShowDeletePopup(!showDeletePopup);

  function Add(task) {
    console.log(task);
    setTasks((prevValue) => {
      return [...prevValue, task];
    });
  }

  function togglePosition(currentId, event) {
    var id = event.target.value;
    var target = "";


    if (id === 1) {
      target = "todo";
    } else if (id === 2) {
      target = "inprogress";
    } else if (id === 3) {
      target = "done";
    }

    var toUpdated = tasks.filter((task) => task.id === currentId);

    toUpdated = { ...toUpdated[0], position: target };


    setTasks((prevValue) => {
      var deletedPrevValue = prevValue.filter((task) => task.id !== currentId);
      return [...deletedPrevValue, toUpdated];
    });
  }

  function handleDelete(id) {
    setDeleteId(id);
    toggledelete();
  }

  function deleteTask() {
    setTasks((prevValues) => {
      return [...prevValues.filter((task) => task.id !== deleteId)];
    });
    setShowDeletePopup(false);
  }

  function Search(searchTitle) {
    setSearchTerm(searchTitle);
    if (searchTitle.length > 0) {
      setSearchResult((prevValue) => {
        return [
          ...tasks.filter((task) =>
            task.title.toLowerCase().includes(searchTitle.toLowerCase())
          ),
        ];
      });
    }
  }

  return (
    <>
    <div>
      <Header onSearch={Search} />
      <MDBRow>
      <TodoPane handleModal={toggleShow}>

        {(searchTerm.length < 1 ? tasks : searchResult)
          .filter((task) => task.position === "todo")
          .map((maptask, index) => {
            return (
              <StickyNote
                key={index}
                id={maptask.id}
                title={maptask.title}
                description={maptask.description}
                position={maptask.position}
                onSecMenuClick={togglePosition}
                onClickDelete={handleDelete}
              />
            );
          })}
      </TodoPane>

      <InProgressPane>
        {(searchTerm.length <1? tasks: searchResult)
          .filter((task) => task.position === "inprogress")
          .map((maptask, index) => {
            return (
              <StickyNote
                key={index}
                id={maptask.id}
                title={maptask.title}
                position={maptask.position}
                description={maptask.description}
                onSecMenuClick={togglePosition}
                onClickDelete={handleDelete}
              />
            );
          })}
      </InProgressPane>

      <DonePane>
        {(searchTerm.length < 1 ? tasks : searchResult)
          .filter((task) => task.position === "done")
          .map((maptask, index) => {
            return (
              <StickyNote
                key={index}
                id={maptask.id}
                title={maptask.title}
                description={maptask.description}
                position={maptask.position}
                onSecMenuClick={togglePosition}
                onClickDelete={handleDelete}
              />
            );
          })}
      </DonePane>
      </MDBRow>
      

      <MDBModal tabIndex='0' show={centredModal} setShow={setCentredModal}>
      <Modal onAdd={Add} toggleShow = {toggleShow} />
      </MDBModal>

      <MDBModal tabIndex='1' show={showDeletePopup} setShow={setShowDeletePopup}>
      <DeletePopup onDelete={deleteTask} toggledelete = {toggledelete} />
      </MDBModal>

      
    </div>
</>
  );
}

export default App;
