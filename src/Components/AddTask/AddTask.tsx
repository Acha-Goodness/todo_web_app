import React, { useState } from 'react';
import { MdClose, MdDateRange, MdNotificationsActive } from "react-icons/md";
import { BsClock } from "react-icons/bs";


interface ButtonProps{
    closeAddTask: () => void;
    addNewTodo: () => void;
    newTodo: string;
    setNewTodo: React.Dispatch<React.SetStateAction<string>>
}

const AddTask = ({closeAddTask, addNewTodo, newTodo, setNewTodo} : ButtonProps) => {
  

  const addTodoTask = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    addNewTodo()
  }

  const cancelTodo = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setNewTodo("")
  }

  return (
    <div className='shadow-md p-5'>
    <div className='flex items-center justify-between'>
        <h3 className='font-[600] text-[18px]'>Add Task</h3>
        <MdClose onClick={closeAddTask}/>
    </div>
    <div className='mt-3'>
        <textarea rows={3} name="todo" value={newTodo} placeholder='Enter About your description' className='w-[100%] p-1 bg-[#E6E8EB] rounded' onChange={(e) => setNewTodo(e.target.value)}/>
        <div className='flex items-center justify-between mt-3'>
            <div className='flex items-center py-2 border border-[#E6E8EB] w-[27%] rounded-[8px] justify-evenly'><MdDateRange className='text-[20px]'/><p className='font-[600] text-[14px]'>Today</p></div>
            <div className='flex items-center py-2 border border-[#E6E8EB] w-[27%] rounded-[8px] justify-evenly'><BsClock className='text-[20px]'/><p className='font-[600] text-[14px]'>00:00</p></div>
            <div className='flex items-center py-2 border border-[#E6E8EB] w-[27%] rounded-[8px] justify-evenly'><BsClock className='text-[20px]'/><p className='font-[600] text-[14px]'>00:00</p></div>
        </div>
        <div className='flex items-center justify-between py-3 mt-3'>
            <div className='flex items-center w-[44%] justify-between'>
                <MdNotificationsActive/>
                <p>10 Minute before</p>
            </div>
            <MdClose/>
        </div>
    </div>
    <div className='mt-5'>
        <button className='rounded-md py-1 px-[15%] w-162.5px border border-[lightgrey] font-[600] text-[16px]' onClick={cancelTodo}>Cancel</button>
        <button className='rounded-md py-1 px-[15%] w-162.5px border border-[#3F5BF6] font-[600] text-[16px] bg-[#3F5BF6] text-white ml-4' onClick={addTodoTask}>Add</button>
    </div>
</div>
  )
}

export default AddTask;
