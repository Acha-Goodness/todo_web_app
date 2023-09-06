import React from 'react';
import { dates } from "../../Components/Dates/dates";

const Dates = () => {
  return (
    <div>
      <h1 className='font-[600] text-[16px] mb-[1.3%]'>January 2023</h1>
      <div className='flex-wrap flex sm:justify-between items-center'>
        {
          dates.map((day, index)=> {
              return(
                <div key={index} className='flex mx-[4%] sm:mx-0 w-[64px] h-[65px] flex-col items-center justify-center rounded-[8px] text-[black] shadow-md'>
                  <h4 className='text-[14px] font-[600]'>{day.day}</h4>
                  <p className='text-[14px] font-[600]'>{day.id}</p>
                </div>
              )
          })
        }
      </div>
    </div>
  )
}

export default Dates;
