import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import TaskForm from './componentsJS/TaskAddForm';
import Header from './componentsJS/Header';
import Chart from './componentsJS/Chart';
import Task from './componentsJS/Task';


function App() {

  // Define all states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState('');
  
  // Fetch tasks on login
  useEffect(() => {
    getTasks();
  }, [isLoggedIn]);
  
  // Make login
  const login = (name, pwd) => {
    fetch('http://localhost:5000/api/login', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({user: name, pass: pwd})})
    .then(response => response.json())
    .then(data => {
      if (data["isAuth"]) {
        setName(name);
        setIsLoggedIn(true);
      }
    });
  };

  // Add task to user
  const addTask = () => {
    fetch(`http://localhost:5000/api/add/${name}/${document.getElementById("taskText").value}`)
    .then(response => getTasks());
  }

  // Get all users tasks
  const getTasks = () => {
    if(isLoggedIn) {
      fetch(`http://localhost:5000/api/fetch/${name}`)
      .then(response => response.json())
      .then(data =>{setTasks(data);})
    }
  }

  // Mark task as done
  const markDone = (text) => {
    fetch(`http://localhost:5000/api/update/${name}/${text}`)
    .then(response => getTasks())
  }

  return (
    <div className="App">
      <Header handleLogin={login} logOut={setIsLoggedIn}/>
      <TaskForm handler={addTask}/>
      <hr />
      {tasks.map(function(task, idx) {
        return <Task key={idx} text={task["text"]} isDone={task["isDone"]} setDone={markDone}/>
            })}
      <Chart name={name} tasks={tasks}/>
    </div>
  );
}

ReactDOM.render(
  <App />,
document.getElementById('root')
);
