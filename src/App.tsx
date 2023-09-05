import React, { useEffect } from 'react';
import './App.css';
import Home from "./Pages/Home/Home";
import { fetchTodo } from './Services/TodoSlice';
import { useAppDispatch } from './Services/Store';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTodo())
  }, [])

  return (
    <div className="App">
     <Home/>
    </div>
  );
}

export default App;
