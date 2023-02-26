import {
    FIND_ID,
    ADD_TASK,
    FIND_TASK_ID,
    FETCH_ALL,
    DELETE_TASK,
    FIND_PROGRESS_TASK,
} from "../constants/types"


const initialState = {
    tab: [],
    currentTask: [],
    progressTask: []
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK: return {
            tab: [...state.tab, action.payload],
            currentTask: state.currentTask,
            progressTask: state.progressTask
        }
        case FIND_TASK_ID: return{
            tab: [...state.tab],
            currentTask: action.payload,
            progressTask: state.progressTask
        }

        case FETCH_ALL: return {
            ...state,
            tab:action.payload,
            currentTask:[action.payload[0]],
            progressTask: state.progressTask
        }

        case DELETE_TASK: return {
            ...state,
            tab: state.tab.filter((item) => (item._id !== action.payload))
        }

        case FIND_ID: return {
            ...state,
            currentTask:action.payload
        }

        case FIND_PROGRESS_TASK: return {
            ...state,
            progressTask: action.payload
        }

        default:
            return state;

    }
}

export default reducer