import React from "react";
import '../componentsCSS/Task.css'

export default function Task(props) {
    return(
        <div onClick= {() => props.setDone(props.text)} className="Task" style={{border: props.isDone ? '3px solid rgba(0, 183, 0, 0.486)': '3px solid rgba(255, 0, 00, 0.486)'}}>
            {props.text}
        </div>
    )
}