import { useState } from "react"

import AddTaskForm from "./components/AddTaskForm"
import UpdateForm from "./components/UpdateForm"
import ToDo from "./components/ToDo"

import "bootstrap/dist/css/bootstrap.min.css"

import "./App.css"

function App() {
  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([])

  // Temp State
  const [newTask, setNewTask] = useState("")
  const [updateData, setUpdateData] = useState("")

  //Add Task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1
      setToDo ([
        ...toDo,
        { id: num, title: newTask, status: false }
      ])
      setNewTask("")
    }
  }

  //Delete Task
  const deleteTask = (id) => {
    setToDo( toDo.filter((task) => task.id !== id) )
  }

  //Mark task as done or completed
  const markDone = (id) => {
    setToDo(toDo.map(
      task => task.id === id
      ? ({ ...task, status: !task.status })
      : (task)
      ))
  }

  //Cancel update
  const cancelUpdate = () => {
    setUpdateData("")
  }

  //Change task for update
  const changeHolder = (e) => {
     setUpdateData({
      ...updateData,
      title: e.target.value,
    })
  }

  //Update task
  const updateTask = () => {
    let removeOldRecord = [...toDo].filter((task) => task.id !== updateData.id)
    setToDo([
      ...removeOldRecord,
      updateData
    ])
    setUpdateData("")
  }

  return (
    <div className="container App">
      <br /> <br />
      <h2>TO-DO LIST</h2>
      <br /> <br />
      {/* Update Task */}
      {updateData && updateData ? (
        <UpdateForm
          updateData={updateData}
          changeHolder={changeHolder}
          updateTask={updateTask}
          cancelUpdate={cancelUpdate}
        />
      ) : (
        <AddTaskForm
          newTask={newTask}
          setNewTask={setNewTask}
          addTask={addTask}
        />
      )}
      {/* Display ToDos */}
      {toDo && toDo.length ? "" : "No Tasks..."}
      <ToDo
        toDo={toDo}
        markDone={markDone}
        setUpdateData={setUpdateData}
        deleteTask={deleteTask}
      />
    </div>
  )
}

export default App
