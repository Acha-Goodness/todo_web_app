import React, { useState } from 'react';
import { MdClose, MdDateRange } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../../Services/TodoSlice';

interface ButtonProps{
    displayEditTask: () => void;
    closeWireFrame: () => void;
    todoDataId: number;
}

const WireFrame = ({displayEditTask, closeWireFrame, todoDataId} : ButtonProps) => {

    const dispatch = useDispatch();

    const handleDelete = () =>{
        console.log("Delete working" + todoDataId)
        dispatch(deleteTodo(todoDataId))
    }

  return (
    <div className='shadow-md p-5'>
        <div className='flex justify-end'>
            <MdClose onClick={closeWireFrame}/>
        </div>
        <div>
            <h1 className='font-[700] text-[18px] py-3'>Create Wireframe</h1>
            <div className='flex items-center mt-2'>
                <MdDateRange className='text-[#3F5BF6] text-[20px]'/>
                <h3 className='ml-2 font-[500] text-[16px] font-[700]'>20th January, 2013</h3>
            </div>
            <div className='flex items-center mt-1'>
                <BsClock className='text-[#3F5BF6] text-[20px]'/>
                <h3 className='ml-2 font-[500] text-[16px] font-[700]'>20th January, 2013</h3>
            </div>
        </div>
        <div className='mt-10'>
            <button className='rounded-md py-1 px-[15%] w-162.5px border border-[lightgrey] font-[600] text-[16px]' onClick={handleDelete}>Delete</button>
            <button className='rounded-md py-1 px-[15%] w-162.5px border border-[#3F5BF6] font-[600] text-[16px] bg-[#3F5BF6] text-white ml-4' onClick={displayEditTask}>Edit</button>
        </div>
    </div>
  )
}

export default WireFrame;
