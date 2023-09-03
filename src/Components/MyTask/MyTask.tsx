import React, { useState } from 'react';
import { todo } from "../../Data/TodoData"; 
import Pagination from '../Pagination/Pagination';

function MyTask() {
  const [ currentPage, setCurrentPage ] = useState(1)
  const recordsPerPage : number = 5;
  const lastIndex : number = currentPage * recordsPerPage;
  const firstIndex : number = lastIndex - recordsPerPage;
  const records = todo.slice(firstIndex, lastIndex);
  const nPage : number = Math.ceil(todo.length / recordsPerPage);
  const numbers : Array<number> = [...Array(nPage + 1).keys()].slice(1);


  const prePage = () => {
    if(currentPage !== 1){
        setCurrentPage(currentPage - 1)
    }
  }

  const changeCPage = (id : number) => {
        setCurrentPage(id)
  }

  const nextPage = () => {
    if(currentPage !== nPage){
        setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className='mt-[5%]'>
      <h1 className='font-[600] text-[16px]'>My Tasks</h1>
      <div>
        {
            records.map((item, index) => {
                return(
                    <div key={index} className='flex justify-between bg-[#F2F2F2] mt-3 py-3 items-center px-7'>
                        <div className='flex w-[32%] items-center'>
                        <input type="checkbox"/>
                        <div className='ml-[5%]'>
                            <h3 className='text-[14px] font-[500]'>{item.title}</h3>
                            <p className='text-[14px] font-[400]'>{item.time}</p>
                        </div>
                        </div>
                        <p className='font-[400] text-[14px]'>{item.date}</p>
                    </div>
                )
            })
        }
        <Pagination numbers={numbers} currentPage={currentPage} prePage={prePage} changeCPage={changeCPage} nextPage={nextPage}/>
      </div> 
    </div>
  )
}

export default MyTask
