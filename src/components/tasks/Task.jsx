import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar'
import { NavLink } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import "./Task.css"
import "../tabs/Tab.css"
import { actionDelete } from '../redux/actions/actions';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { actionUpdateTask } from '../redux/actions/actions';


// this component will show all the informations of a specific task that the user wants to look at.
const Task = () => {

  // get specific task from redux store.
  const task = useSelector((state) => state.currentTask)
  const dispatch = useDispatch()

  useEffect(() => {
    if (task.length === 1) {
      setTaskNumberUpdate(task[0].taskName);
      setDescriptionUpdate(task[0].taskDecription)
      setId(task[0]._id)
    }
  }, [task])

  // updating dialog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  // updating task by dispatching "actionUpdateTask" with specific id and update information
  const handleClose = () => {
    setOpen(false);
  };

  //update task function. updated information will be stored in updateTask object and send to redux action to update
  const updateTask = () => {
    const taskUpdate = {
      taskName: taskNumberUpdate,
      taskDecription: descriptionUpdate
    }
    if (taskNumberUpdate === "" || taskNumberUpdate === "") {
      alert("You need to type in input field!")
    } else {
      dispatch(actionUpdateTask(task[0]._id, taskUpdate))
      alert("update successful!")
      setOpen(false)
    }
  }

  //variable for handling update
  const [taskNumberUpdate, setTaskNumberUpdate] = useState("")
  const [descriptionUpdate, setDescriptionUpdate] = useState("")
  const [id, setId] = useState("")

  // handle onchange updating new task
  const handleNameUpdate = (e) => {
    setTaskNumberUpdate(e.target.value)
  }
  const handleDescriptionUpdate = (e) => {
    setDescriptionUpdate(e.target.value)
  }

  return (
    <div>
      <NavBar />
      {/* display task information */}
      <div className='task-description'>
        <div></div>
        <div className='description-container'>
          <p className='task-item'><b>ID:</b> {id}</p>
          <p className='task-item'><b>Name:</b> {task[0].taskName}</p>
          <p className='task-item'><b>Description:</b> {task[0].taskDecription}</p>
          <p className='task-item'><b>Completed status:</b> {JSON.stringify(task[0].completed)}</p>
          <NavLink className="go-back" to="/tab">Go Back</NavLink>
          <NavLink style={{ "marginLeft": "10px" }} onClick={handleClickOpen} className="go-back">Update</NavLink>
          <NavLink style={{ "marginLeft": "10px", "backgroundColor": "#0074CC" }} onClick={() => dispatch(actionDelete(id))} className="go-back" to="/tab">Delete</NavLink>
        </div>
        <div></div>
      </div>
      {/* update task dialog */}
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Update Task"}
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
              value={taskNumberUpdate}
              onChange={handleNameUpdate}
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Task Description"
              type="text"
              fullWidth
              variant="standard"
              value={descriptionUpdate}
              onChange={handleDescriptionUpdate}
            />
          </DialogContent>
          <DialogActions>
            <NavLink to="/tab"><Button onClick={updateTask}>Update</Button></NavLink>
            <Button href='/tab' onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

export default Task