import React, { useState, useEffect } from 'react';
import Pagination from '../Pagination/Pagination';

interface Todo {
  id:number,
  title:string,
  userId:number,
  completed:boolean;
}

interface ButtonsProps{
    todoData:Todo[];
    comboFunc:(id:number) => void;
    markCompleted:(id:number) => void;
  }

function MyTask({todoData, comboFunc, markCompleted}: ButtonsProps) {

  const [ currentPage, setCurrentPage ] = useState<number>(1);
  const recordsPerPage : number = 7;
  const lastIndex : number = currentPage * recordsPerPage;
  const firstIndex : number = lastIndex - recordsPerPage;
  const records = todoData.slice(firstIndex, lastIndex);
  const nPage : number = Math.ceil(todoData.length / 20);
  const numbers : Array<number> = [...Array(nPage + 1).keys()].slice(1);


  const prePage = () => {
    if(currentPage !== 1){
        setCurrentPage(currentPage - 1);
    };
  };

  const changeCPage = (id : number) => {
        setCurrentPage(id);
  };

  const nextPage = () => {
    if(currentPage !== nPage){
        setCurrentPage(currentPage + 1);
    };
  };

  // const comboFunc = (id:number) => {
  //     retriveId(id)
  //     displayWireFrame();
  // }

  return (
    <div className='mt-[20%] sm:mt-[5%]'>
      <h1 className='font-[600] text-[16px]'>My Tasks</h1>
      <div>
        {records.length === 0 ? <h1 className='text-[30] text-[#3F5BF6] font-[900] text-center py-[10%]'>YOU DON'T HAVE ANY TASK</h1>
            :  
            records.map((item, index) => {
                return(
                    <div key={index} className={`flex justify-between bg-[#F2F2F2] mt-3 py-3 items-center px-2 sm:px-7 ${item.completed && "opacity-50"}`} onClick={() => comboFunc(item.userId)}>
                        <div className='flex w-[80%] items-center'>
                        <input type="checkbox" onChange={() => markCompleted(item.userId)}/>
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
      <div className='hidden sm:block'>
        <Pagination numbers={numbers} currentPage={currentPage} prePage={prePage} changeCPage={changeCPage} nextPage={nextPage}/>
      </div>
    </div>
  )
}

export default MyTask
 