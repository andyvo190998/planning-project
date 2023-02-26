import React from 'react'
import { Routes, Route, HashRouter } from 'react-router-dom';
import NavBar from './components/NavBar';
import Tab from './components/tabs/Tab';
import Task from "./components/tasks/Task";
import "./App.css"
import { Provider } from 'react-redux';
import store from './components/redux/store';


const App = () => {
  return (
    <Provider store={store}>
      <HashRouter>
        <main>
          <Routes>
            <Route path='/' element={<NavBar />}></Route>
            <Route path='tab' element={<Tab />}></Route>
            <Route path='/task/:id' element={<Task />}></Route>
          </Routes>
        </main>
      </HashRouter>
    </Provider>
  )
}

export default App