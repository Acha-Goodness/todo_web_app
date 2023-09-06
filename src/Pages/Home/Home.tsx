import React, { useState, useEffect } from 'react';
import Header from "../../Components/Header/Header";
import { BsPlus } from "react-icons/bs";
import { BsMicFill } from "react-icons/bs";
import Days from "../../Components/Dates/Days";
import MyTask from '../../Components/MyTask/MyTask';
import Calender from "../../Components/Calendar/Calendar";
import AddTask from '../../Components/AddTask/AddTask';
import EditTask from '../../Components/EditTask/EditTask';
import WireFrame from '../../Components/CreateWireFrame/WireFrame';
import Axios from 'axios';

interface Todo {
  id:number,
  title:string,
  userId:number,
  completed:boolean
}

const Home = () => {
  const [ todoData, setTodoData ] = useState<Todo[]>([]);
  const [ showAddTask, setShowAddTask ] = useState<boolean>(false);
  const [ showEditTask, setEditTask ] = useState<boolean>(false);
  const [ showWireFrame, setWireFrame ] = useState<boolean>(false);
  const [ todoDataId, setTodoDataId ] = useState<number>(0);
  const [ todoToEdit, setTodoToEdit ] = useState<string>("");
  const [ editTodoId, setEditTodoId ] = useState<number>(0);
  const [ newTodo, setNewTodo ] = useState<string>("");

  // useEffect(() => {
  //   Axios.get("https://jsonplaceholder.typicode.com/todos")
  //   .then(res => {
  //     setTodoData(res.data)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // },[])

  const addNewTodo = () => {
    if (!newTodo.trim()) return;
    Axios.post("https://jsonplaceholder.typicode.com/todos",  {
      id:todoData.length,
      title: newTodo,
      userId:todoData.length + 1,
      completed: false,
    })
    .then(res => {
      if (res.status === 201) {
        setTodoData([
          ...todoData,
          res.data
        ]);
        setNewTodo("");
      }
    }).catch(err => {
      alert(err)
    })
  }

  const deleteTodo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${todoDataId}`)
    .then(res => {
      if (res.status === 200) {
        setTodoData((prevTodos) => todoData.filter((todo) => todo.userId !== todoDataId));
      }
      
    }).then(() => {
      resetId()
      todoData.length - 1 === 0 && displayAddTask();
    }).catch(err => {
      alert(err.message);
    })
  }

  const saveEditedTodo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    Axios.put(`https://jsonplaceholder.typicode.com/todos/${editTodoId}`, {title:todoToEdit})
    .then((res) => {
      if(res.status === 200){
        setTodoData((prevTodos) =>  
          prevTodos.map((todo) => 
            todo.userId === editTodoId ? {...todo, title:todoToEdit } : todo
          )
        )
        setTodoToEdit("");
      }
    }).catch(err => {
      alert(err)
    })
  }

  const comboFunc = (id:number) => {
    displayWireFrame();
    if(id !== todoDataId){
       setTodoDataId(id)
    }else{
       setTodoDataId(id + 1)
    }
  }

  const displayAddTask = () => {
    setShowAddTask(true);
    closeWireFrame();
  }

  const closeAddTask = () => {
    setShowAddTask(false);
    setEditTask(false);
    setWireFrame(false);
  }

  const displayEditTask = () => {
    try{
        if(todoDataId){
          let todo : any = todoData.find((todo) => todo.userId === todoDataId)
          setTodoToEdit(todo.title)
          setEditTodoId(todo.userId)
          setEditTask(true);
        }
    }catch(error:any){
      console.error(error.message)
      alert("Select Todo to edit")
    }
    return null;
  }

  const closeEditTask = () => {
    setEditTask(false);
  }

  const displayWireFrame = () => {
    setWireFrame(true);
    setShowAddTask(false)
    setEditTask(false)
  }

  const closeWireFrame = () => {
    setWireFrame(false);
  }

  const resetId = () => {
    const firstTodoIndex = todoData.findIndex(() => true)
    let firstTodo = todoData.find((td) => todoData.indexOf(td) === firstTodoIndex )
    firstTodo && comboFunc(firstTodo.userId)
  }

  return (
    <div>
      <Header/>
      <div className="sm:px-[4%] pb-[3%]">
        <div className="flex items-center justify-between py-5">
          <div className='px-2 sm:px-0'>
            <h2 className='text-[30px] font-[600]'>Good Morning</h2>
            <p className='text-[16px] font-[400]'>You got some task to do.</p>
          </div>
            <button className="hidden sm:flex items-center bg-[#3F5BF6] w-[165px] py-1 text-[white] rounded-md text-[14px] justify-center" onClick={displayAddTask}> <BsPlus className="text-[25px]"/> Create new task</button>
        </div>
        <div className='sm:flex justify-between'>
          <div className='sm:w-[67%] p-2 sm:p-5 shadow-md'>
            <Days/>
            <MyTask todoData={todoData} comboFunc={comboFunc}/>
          </div>
          <div className='sticky bottom-0 sm:hidden w-[100%] left-0'>
            <BsMicFill className='relative left-[89%] bottom-[-40px] text-[150%] text-[#3F5BF6]' onClick={addNewTodo}/>
            <input type="text" value={newTodo} placeholder="Input Task" className='px-2 py-4 shadow-lg w-[97%] mx-1 rounded-md border-[lightgrey] border' onChange={(e) => setNewTodo(e.target.value)}/>
          </div>
          <div className='sm:w-[30%]'>
            {(() => {
              if (showAddTask) {
                  return (
                    <AddTask closeAddTask={closeAddTask} addNewTodo={addNewTodo} newTodo={newTodo} setNewTodo={setNewTodo}/>
                  )
              } else if (showEditTask) {
                  return (
                    <EditTask closeEditTask={closeEditTask} todoToEdit={todoToEdit} saveEditedTodo={saveEditedTodo} setTodoToEdit={setTodoToEdit}/>
                  )
              } else if(showWireFrame) {
                  return (
                    <WireFrame displayEditTask={displayEditTask} closeWireFrame={closeWireFrame} deleteTodo={deleteTodo}/>
                  )
              } else {
                return (
                    <Calender/>
                )
              }
            })()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
