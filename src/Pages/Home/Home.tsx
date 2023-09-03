import React from 'react';
import Header from "../../Components/Header/Header";
import { BsPlus } from "react-icons/bs";
import Days from "../../Components/Dates/Days";
import MyTask from '../../Components/MyTask/MyTask';
import Calender from "../../Components/Calendar/Calendar";

const Home = () => {
  return (
    <div>
      <Header/>
      <div className="px-[4%] pb-[3%]">
        <div className="flex items-center justify-between py-5">
          <div>
            <h2 className='text-[30px] font-[600]'>Good Morning</h2>
            <p className='text-[16px] font-[400]'>You got some task to do.</p>
          </div>
            <button className=" flex items-center bg-[blue] w-[165px] py-1 text-[white] rounded-md text-[14px] justify-center"> <BsPlus className="text-[25px]"/> Create new task</button>
        </div>
        <div className='flex justify-between'>
          <div className='w-[67%] p-5 shadow-md'>
            <Days/>
            <MyTask/>
          </div>
          <div className='w-[30%]'>
            <Calender/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
