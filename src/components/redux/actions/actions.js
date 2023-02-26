import { ADD_TASK, FIND_ID, FETCH_ALL, DELETE_TASK, FIND_PROGRESS_TASK } from "../constants/types";
import { getTasks, getTaskById, createTask, updateComplete, deleteTask, updateTask } from '../api/api'


// find specific task by id
export const findTaskId = (id) => async (dispatch) => {
    const { data } = await getTaskById(id);
    dispatch({ type: FIND_ID, payload: data })
}

// get all task from database
export const fetchTask = () => async (dispatch) => {
    const { data } = await getTasks();
    dispatch({ type: FETCH_ALL, payload: data });
};

// user add new task
export const addTask = (task) => async (dispatch) => {
    const { data } = await createTask(task);
    dispatch({ type: ADD_TASK, payload: data })
};

// Update task to completed
export const actionUpdate = (id) => async (dispatch) => {
    await updateComplete(id)
    const { data } = await getTasks();
    dispatch({ type: FETCH_ALL, payload: data });
}

// user delete task
export const actionDelete = (id) => async (dispatch) => {
    await deleteTask(id)
    dispatch({ type: DELETE_TASK, payload: id })
}

// user update task description
export const actionUpdateTask = (id, update) => async (dispatch) => {
    await updateTask(id, update)
}

// action find the task is in progress
export const actionFindProgressTask = (task) => async (dispatch) => {
    dispatch({ type: FIND_PROGRESS_TASK, payload: task })
}