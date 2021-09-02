import React from 'react';
import '../componentsCSS/TaskAddForm.css'

export default function TaskAddForm(props) {
    return(
        <form onSubmit={(e) => e.preventDefault()}>
            <label>
                Enter your new task: 
            </label>
            <input id="taskText"></input>
            <button type="submit" onClick={props.handler}>submit</button>
        </form>
    )
}