import React, { useState, useEffect } from 'react';
import Header from "../../Components/Header/Header";
import { BsPlus } from "react-icons/bs";
import Days from "../../Components/Dates/Days";
import MyTask from '../../Components/MyTask/MyTask';
import Calender from "../../Components/Calendar/Calendar";
import AddTask from '../../Components/AddTask/AddTask';
import EditTask from '../../Components/EditTask/EditTask';
import WireFrame from '../../Components/CreateWireFrame/WireFrame';
import { nanoid } from 'nanoid'
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

  // useEffect(() => {
  //   Axios.get("https://jsonplaceholder.typicode.com/todos")
  //   .then(res => {
  //     setTodoData(res.data)
  //   }).catch(err => {
  //     console.log(err)
  //   })
  // },[])

  const addNewTodo = (newTodo:string) => {
    if (!newTodo.trim()) return;
    Axios.post("https://jsonplaceholder.typicode.com/todos",  {
      id:nanoid(),
      title: newTodo,
      userId:todoData.length,
      completed: false,
    })
    .then(res => {
      console.log(res)
      if (res.status === 201) {
        setTodoData([
          ...todoData,
          res.data
        ]);
        alert('Todo added successfully');
      } else {
        alert('Failed to add todo');
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
        setTodoData((prevTodos) => todoData.filter((todo) => todo.id !== todoDataId));
      } else {
        alert('Failed to delete todo');
      }
    }).catch(err => {
      alert(err.message);
    })
  }

  const saveEditedTodo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    Axios.put(`https://jsonplaceholder.typicode.com/todos/${editTodoId}`, {title:todoToEdit})
    .then((res) => {
      if(res.status === 200){
        console.log("Todo update successfully")
        setTodoData((prevTodos) =>  
          prevTodos.map((todo) => 
            todo.id === editTodoId ? {...todo, title:todoToEdit } : todo
          )
        )
        setTodoToEdit("");
      }else{
        alert("an error occur")
      }
    }).catch(err => {
      alert(err.message)
    })
  }

  const retriveId = (id: number) => {
    setTodoDataId(id)
  }

  const displayAddTask = () => {
    setShowAddTask(true);
  }

  const closeAddTask = () => {
    setShowAddTask(false);
    setEditTask(false);
    setWireFrame(false);
  }

  const displayEditTask = () => {
    setEditTask(true);
    let todo : any = todoData.find((todo) => todo.id === todoDataId)
    setTodoToEdit(todo.title)
    setEditTodoId(todo.id)
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

  return (
    <div>
      <Header/>
      <div className="px-[4%] pb-[3%]">
        <div className="flex items-center justify-between py-5">
          <div>
            <h2 className='text-[30px] font-[600]'>Good Morning</h2>
            <p className='text-[16px] font-[400]'>You got some task to do.</p>
          </div>
            <button className="flex items-center bg-[#3F5BF6] w-[165px] py-1 text-[white] rounded-md text-[14px] justify-center" onClick={displayAddTask}> <BsPlus className="text-[25px]"/> Create new task</button>
        </div>
        <div className='flex justify-between'>
          <div className='w-[67%] p-5 shadow-md'>
            <Days/>
            <MyTask todoData={todoData} displayWireFrame={displayWireFrame} retriveId={retriveId}/>
          </div>
          <div className='w-[30%]'>
            {(() => {
              if (showAddTask) {
                  return (
                    <AddTask closeAddTask={closeAddTask} addNewTodo={addNewTodo}/>
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
