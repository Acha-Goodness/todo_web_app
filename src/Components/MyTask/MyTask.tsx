import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';
import { useAppSelector } from '../../Services/Store';

interface ButtonsProps{
    displayWireFrame: () => void;
    retriveId: (id:number) => void;
  }

function MyTask({displayWireFrame, retriveId,}: ButtonsProps) {
  const todos = useAppSelector((state) => state.todo.todo);

  const [ currentPage, setCurrentPage ] = useState<number>(1)
  const recordsPerPage : number = 7;
  const lastIndex : number = currentPage * recordsPerPage;
  const firstIndex : number = lastIndex - recordsPerPage;
  const records = todos.slice(firstIndex, lastIndex);
  const nPage : number = Math.ceil(todos.length / 20);
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


  const comboFunc = (id:number) => {
    retriveId(id)
    displayWireFrame();
  }

  return (
    <div className='mt-[5%]'>
      <h1 className='font-[600] text-[16px]'>My Tasks</h1>
      <div className='h-[100%]'>
        {
            records.map((item, index) => {
                return(
                    <div key={index} className='flex justify-between bg-[#F2F2F2] mt-3 py-3 items-center px-7' onClick={() => comboFunc(item.id)}>
                        <div className='flex w-[80%] items-center'>
                        <input type="checkbox"/>
                        <div className='ml-[5%]'>
                            <h3 className='text-[14px] font-[500]'>{item.title}</h3>
                            <p className='text-[14px] font-[400]'>10th June 2023</p>
                        </div>
                        </div>
                        <p className='font-[400] text-[14px]'>Today</p>
                    </div>
                )
            })
        }
      </div> 
      <Pagination numbers={numbers} currentPage={currentPage} prePage={prePage} changeCPage={changeCPage} nextPage={nextPage}/>
    </div>
  )
}

export default MyTask
