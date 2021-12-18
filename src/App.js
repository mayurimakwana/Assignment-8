import Header from "./Components/Header";
import Footer from "./Components/Footer";
import React from "react";
import About from "./Components/About";
import "./index.css";
import Tasks from "./Components/Tasks";
import { useState ,useEffect} from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import AddTask from "./Components/AddTask";

export default function App() {
  const [tasks, setTask] = useState([]);

  const [showAddTask, setShowAddTask] = useState(true);

  useEffect(() =>{
      const getTasks = async() =>{
      const tasksFromServer =await fetchTasks()
      setTask(tasksFromServer)
      }
      getTasks()
  },[])

  //fetch data from json
  const fetchTasks= async() =>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data 
  }
  //delete task
  const deleteTask =async (id) => {

    // console.log("delete", id)
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE',
    })
    setTask(tasks.filter((task) => task.id !== id));
  };

    //fetch one record for update  from json using id
    const fetchTask= async(id) =>{
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()
      return data 
    }
  //onToggle change reminder
  const toggleReminder = async(id) => {
    const tasktoToggle =await fetchTask(id);
    const updTask = {...tasktoToggle, reminder: !tasktoToggle.reminder}

    const res =await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type' : 'application/json'
      },
      body:JSON.stringify(updTask)
    })
    const data= await res.json()
    setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !data.reminder } : task
      )
    );
  };

  // Add Task
  const addTask = async(task) => {
    const res = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task)

    })
    const data = await res.json()
    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    setTask([...tasks, data]);
  };
  return (
    <Router>
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAddTask={showAddTask}
      />
   
      <Routes >
        <Route path="/" element={
           <>
  {showAddTask && <AddTask onAdd={addTask} />}

{tasks.length > 0 ? (
<Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
) : (
  "No  Task to Show"
)}
           </>
        } 
        />
      <Route path="/about" element={<About />}/> 
 
      </Routes>
      <Footer />
    </div>
    </Router>
  );
}
