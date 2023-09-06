import React, { useState } from 'react';
import { MdClose, MdDateRange } from "react-icons/md";
import { BsClock } from "react-icons/bs";
import Axios from "axios";

interface ButtonProps{
    displayEditTask: () => void;
    closeWireFrame: () => void;
    deleteTodo: (e: React.MouseEvent<HTMLElement>) => void;
}

const WireFrame = ({displayEditTask, closeWireFrame, deleteTodo} : ButtonProps) => {


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
            <button className='rounded-md py-1 px-[15%] w-162.5px border border-[lightgrey] font-[600] text-[16px]' onClick={deleteTodo}>Delete</button>
            <button className='rounded-md py-1 px-[15%] w-162.5px border border-[#3F5BF6] font-[600] text-[16px] bg-[#3F5BF6] text-white ml-4' onClick={displayEditTask}>Edit</button>
        </div>
    </div>
  )
}

export default WireFrame;
