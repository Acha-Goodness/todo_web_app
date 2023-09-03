import React, { useState, useEffect } from 'react';
import Header from "../../Components/Header/Header";
import { BsPlus } from "react-icons/bs";
import Days from "../../Components/Dates/Days";
import MyTask from '../../Components/MyTask/MyTask';
import Calender from "../../Components/Calendar/Calendar";
import AddTask from '../../Components/AddTask/AddTask';
import EditTask from '../../Components/EditTask/EditTask';
import WireFrame from '../../Components/CreateWireFrame/WireFrame';

const Home = () => {
  const [ showCalender, setShowCalender ] = useState(false);
  const [ showAddTask, setShowAddTask ] = useState(false);
  const [ showEditTask, setEditTask ] = useState(false);
  const [ showWireFrame, setWireFrame ] = useState(false)

  useEffect(() => {

  }, [])

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
  }

  const closeEditTask = () => {
    setEditTask(false);
  }

  const displayWireFrame = () => {
    setWireFrame(true);
    setShowAddTask(false)
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
            <MyTask displayWireFrame={displayWireFrame}/>
          </div>
          <div className='w-[30%]'>
            {(() => {
              if (showAddTask) {
                  return (
                    <AddTask closeAddTask={closeAddTask}/>
                  )
              } else if (showEditTask) {
                  return (
                    <EditTask closeEditTask={closeEditTask}/>
                  )
              } else if(showWireFrame) {
                  return (
                    <WireFrame displayEditTask={displayEditTask} closeWireFrame={closeWireFrame}/>
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
