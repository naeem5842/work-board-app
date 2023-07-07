import React, { useState, useEffect } from "react";
import TodoPane from "./ToDoPane/TodoPane";
import InProgressPane from "./InProgressPane/InProgressPane.jsx";
import DonePane from "./DonePane/DonePane.jsx";
import Modal from "./modal/Modal.jsx";
import StickyNote from "./StickeyNote/StickyNote.jsx";
import DeletePopup from "./DeletePopup/DeletePopup.jsx";
import Header from "./Header/Header.jsx";
import { MDBRow, MDBModal } from "mdb-react-ui-kit";

function Dashboard(props) {
  // const [modelShow, setModelShow] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [centredModal, setCentredModal] = useState(false);

  const toggleShow = () => setCentredModal(!centredModal);
  const toggledelete = () => setShowDeletePopup(!showDeletePopup);

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    const userId = JSON.parse(user)._id;
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/task/get-all-tasks?id=${userId}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      setTasks(data);
    }
  };

  const Add = async (task) => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    const userId = JSON.parse(user)._id;
    const data = {
      task: task,
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/task/save-all-tasks?id=${userId}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setTasks(data.tasks);
    }

    // console.log(task);
  };

const togglePosition = async (currentId, event) => {
    const  id = event.target.value;
    var target = "";
    if (id === 1) {
      target = "todo";
    } else if (id === 2) {
      target = "inprogress";
    } else if (id === 3) {
      target = "done";
    }

    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    const userId = JSON.parse(user)._id;
    const data = {
      task: {
        id: currentId,
        position : target
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/task/update-position?id=${userId}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setTasks(data.tasks);
    }
    






  }

  function handleDelete(id) {
    setDeleteId(id);
    toggledelete();
  }

  const deleteTask = async () => {
    const user = sessionStorage.getItem("user");
    const token = sessionStorage.getItem("token");
    const userId = JSON.parse(user)._id;
    const data = {
      task: {
        id: deleteId,
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND}/task/delete-task?id=${userId}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (response.ok) {
      const data = await response.json();
      setTasks(data.tasks);
    }

    setShowDeletePopup(false);
  };

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

  const handleLogout = () => {
    props.handleLogout();
  };
  return (
    <>
      <div>
        <Header onSearch={Search} handleLogout={handleLogout}></Header>
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
            {(searchTerm.length < 1 ? tasks : searchResult)
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

        <MDBModal tabIndex="0" show={centredModal} setShow={setCentredModal}>
          <Modal onAdd={Add} toggleShow={toggleShow} />
        </MDBModal>

        <MDBModal
          tabIndex="1"
          show={showDeletePopup}
          setShow={setShowDeletePopup}
        >
          <DeletePopup onDelete={deleteTask} toggledelete={toggledelete} />
        </MDBModal>
      </div>
    </>
  );
}

export default Dashboard;
