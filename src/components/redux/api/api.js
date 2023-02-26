import axios from "axios";


// const url = window.env.REACT_APP_SERVER_URL;
const url = process.env.REACT_APP_SERVER_URL

// create task api
export const createTask = (newTask) => axios.post(`${url}/newtask`, newTask);

// get all tasks api
export const getTasks = () => axios.get(`${url}`)

// get specific task by id api
export const getTaskById = (id) => axios.get(`${url}/task/${id}`)

//get task on progress api
export const getProgressTask = (id) => axios.get(`${url}/progresstask/${id}`)

// update task to be completed api
export const updateComplete = (id) => axios.put(`${url}/update/${id}`)

// delete specific task by id api
export const deleteTask = (id) => axios.delete(`${url}/delete/${id}`)

// update task description api
export const updateTask = (id, update) => axios.put(`${url}/taskupdate/${id}`, update)