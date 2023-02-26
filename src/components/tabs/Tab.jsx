import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import { NavLink } from "react-router-dom"
import "./Tab.css"
import { useSelector, useDispatch } from 'react-redux';
import { fetchTask, findTaskId, actionUpdate, actionFindProgressTask, addTask } from '../redux/actions/actions';
import AddIcon from '@mui/icons-material/Add';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';




const Tab = () => {

  //taskList contains an array with task objects inside in redux store
  const taskList = useSelector((state) => state.tab);
  //progressTask is an array with an object of the next task that needs to be done inside
  const progressTask = useSelector((state) => state.progressTask);
  const dispatch = useDispatch()

  useEffect(() => {
    //this loop helps to find the next task that need to be done and call to redux to update store
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].completed === false) {
        dispatch(actionFindProgressTask(taskList[i]))
        break;
      }
    }
  }, [taskList, dispatch])


  //this function dispatches actionUpdate to change the task is in progress to be completed and move to the next task
  const submit = (e) => {
    dispatch(actionUpdate(progressTask._id))
    alert("Task completed")
  }

  // this hook will fetch all tasks from database
  useEffect(() => {
    dispatch(fetchTask())
  }, [taskList.length, dispatch]);


  // open add task dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // updating task by dispatching "actionUpdateTask" with specific id and update information
  const handleClose = () => {
    setOpen(false);
  };

  //add new task function. Task information will be stored in addNew object and then dispatched addTask with addNew object inside
  const addNewTask = () => {
    const addNew = {
      taskName: addTaskName,
      taskDecription: addTaskDescription,
      completed: false
    }
    if (addTaskName === "" || addTaskDescription === "") {
      alert("You need to type in input field!")
    } else {
      alert("Add task successfully!")
      setAddTaskName("")
      setAddTaskDescription("")
      dispatch(addTask(addNew))
      setOpen(false)
    }
  }
  //variable for handling adding
  const [addTaskName, setAddTaskName] = useState("")
  const [addTaskDescription, setAddTaskDescription] = useState("")


  // handle onchange adding new task
  const handleName = (e) => {
    setAddTaskName(e.target.value)
  }
  const handleDescription = (e) => {
    setAddTaskDescription(e.target.value)
  }


  return (
    <div>
      <NavBar />
      <div className="task-container">
        {/* map method loops through an array that contains all tasks and then display task name on a square box container, user can click on that box to see all the information of a specific task */}
        {taskList.map(item => {
          if (item.completed === true) {
            return (
              <NavLink key={item._id} className='task-disable'>
                {item.taskName}
              </NavLink>)
          } else {
            return (
              <NavLink onClick={() => dispatch(findTaskId(item._id))} to={`/task/${item._id}`} key={item._id} className='task'>
                {item.taskName}
              </NavLink>
            )
          }
        })}
        {/* This link leads to the add task form */}
        <NavLink onClick={handleClickOpen} className='btn-add-task'>
          <AddIcon style={{ "padding": "0px" }} />
        </NavLink>
      </div>
      {/* Unordered list shows all tasks and the progress, Submit button will update the task in progress to be done */}
      {/* The loop and if condition helps user see if the task completed => text and box will be turn grey, if task in progress => box is green, next task => box is not filled */}
      <ul className="events">
        <button onClick={() => submit()} className='btn-submit'>Submit</button>
        {taskList.map(item => {
          // check if task completed => turn into black
          if (item.completed === true) {
            return (
              <li key={item._id}>
                <time className='time-completed' ><TaskAltIcon /></time>
                <span>{item.taskName}: {item.taskDecription}</span>
              </li>
            )
          }
          // check task is in progress => turn into green
          else if (item._id === progressTask._id) {
            return (
              <li style={{ "color": "black" }} key={item._id}>
                <time className='time-progress'><progress max="100" value="60"></progress></time>
                <span>{item.taskName}: {item.taskDecription}</span>
              </li>
            )
          }
          // check if task is the last one => remove progress line
          else if (item._id === taskList[taskList.length - 1]._id) {
            return (
              <li style={{ "color": "black" }} key={item._id}>
                <time className='time-next' ></time>
                <span className='last-task'>{item.taskName}: {item.taskDecription}</span>
              </li>
            )
          }
          // check task which is undone => turn into grey
          else {
            return (
              <li style={{ "color": "black" }} key={item._id}>
                <time className='time-next' ></time>
                <span>{item.taskName}: {item.taskDecription}</span>
              </li>
            )
          }
        })}
      </ul>
      {/* Add new task dialog */}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Add Task"}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task Number"
              type="text"
              fullWidth
              variant="standard"
              value={addTaskName}
              onChange={handleName}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task Description"
              type="text"
              fullWidth
              variant="standard"
              value={addTaskDescription}
              onChange={handleDescription}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={addNewTask}>Add Task</Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default Tab