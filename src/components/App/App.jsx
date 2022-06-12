// Adding a Task: Right-click on the ToDo pane will open a menu option with - “New Task”.
// On click of New Task, open a modal (popup) and ask for Title (Text Field) and
// Description (Text Area) and a button - “Add Task”. On clicking the “Add Task” button, the
// modal should close and the task should be displayed in the Todo Pane in form of a sticky
// note.
// ** A task can only be added from the Todo Pane. Right-Clicking in the InProgress and
// Done should not show anything.

// ● Menu Options on Sticky Notes: If right-clicked on any sticky notes, it should give open
// a menu option with the following options -
// ○ Send to >
// ■ Todo (disabled if already on Todo)
// ■ In Progress (disabled if already on In-Progress)
// ■ Done (disabled if already on Done)
// ○ Delete
// ○ Archive

import React, { useState } from "react";
import TodoPane from "../ToDoPane/TodoPane.jsx";
import InProgressPane from "../InProgressPane/InProgressPane.jsx";
import DonePane from "../DonePane/DonePane.jsx";
import Modal from "../modal/Modal.jsx";
import StickyNote from "../StickeyNote/StickyNote.jsx";
import DeletePopup from "../DeletePopup/DeletePopup.jsx";
import Header from "../Header/Header.jsx";

function App() {
  const [modelShow, setModelShow] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [deleteId, setDeleteId]= useState();
  const [showDeletePopup, setShowDeletePopup] =useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const[searchTerm ,setSearchTerm]= useState('');

  function openModal() {
    setModelShow(true);
  }

  function togglemodal() {
    setModelShow(false);
  }

  function Add(task) {
    setTasks((prevValue) => {
      return [...prevValue, task];
    });

    setModelShow(false);
  }

  function togglePosition(currentId, event) {
    var id = event.target.value;
    var target = "";
    let targetIndex;
   
    if (id === 1) {
      target = "todo";
    } else if (id === 2) {
      target = "inprogress";
    } else if (id === 3) {
      target = "done";
    }

    console.log(currentId);  
    
    var toUpdated = tasks.filter((task) => task.id===currentId);
    console.log(toUpdated);
    
    toUpdated={...toUpdated[0],position:target}

    console.log(toUpdated);
    console.log(tasks)

    setTasks((prevValue) => {
      var deletedPrevValue= prevValue.filter(task=>task.id!=currentId);
      return [
        ...deletedPrevValue,
        toUpdated
      ];
    }
    );
  }


    function handleDelete(id){
        setDeleteId(id)
        setShowDeletePopup(true)
        
       
    }
    

    function deleteTask(){
      console.log(tasks);
       setTasks((prevValues)=>{
          return[
            ...prevValues.filter(task=>task.id!== deleteId),
          ]
        })

        console.log(tasks);

        setShowDeletePopup(false);

    }


    function Search(searchTitle){
      setSearchTerm(searchTitle);
    if(searchTitle.length>0){
      setSearchResult((prevValue)=>{return[
        ...tasks.filter(task=>task.title.toLowerCase().includes(searchTitle.toLowerCase())),
      ]
    })     
    }
  }

      

     
  return (
     <div>

      <Header onSearch ={Search}/>

      <TodoPane handlModal={openModal}>
        {(searchTerm.length<1?tasks:searchResult)
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
        {(searchTerm.length<1?tasks:searchResult)
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
        {(searchTerm.length<1? tasks:searchResult)
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
      
      {modelShow && <Modal onAdd={Add} onClickOverlay={togglemodal} />}

      {showDeletePopup&&<DeletePopup onDelete={deleteTask}/>}
      </div>
  );
}
    
export default App;
