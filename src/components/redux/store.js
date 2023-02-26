import {createStore} from 'redux';
import { composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducer/reducer';
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";





const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store