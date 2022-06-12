import React from "react";
import "./DonePane.css"

function DonePane(prop){
    return(
        <div className="done-pane container">
            <h1>Done!</h1>
            {prop.children}
        </div>
    )
}

export default DonePane;