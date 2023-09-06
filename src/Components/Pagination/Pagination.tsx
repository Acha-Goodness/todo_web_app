import * as React from 'react';
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

interface ButtonProps {
    prePage:() => void;
    changeCPage: (id : number) => any;
    nextPage: () => void;
    currentPage: number;
    numbers: number[]
  }

const Pagination = ({numbers, currentPage, prePage, changeCPage, nextPage}:ButtonProps) => {
  return (
    <nav className='flex items-center justify-between mt-5 list-none'>
        <div className='flex items-center w-[10%] justify-between text-[14px]'>
            <FaArrowLeft/>
            <li onClick={prePage}><a href='#'>Previous</a></li>
        </div>
        <div className='flex items-center w-[75%] items-center justify-center'>
            {
                numbers.map((n, i) => (
                    <li key={i} className={`py-2 w-[40px] text-center ${currentPage === n ? "bg-[lightgrey] rounded-3xl" : "bg-[white]"}`} onClick={() => changeCPage(n)}>
                        <a href='#'>{n}</a>
                    </li>
                ))
            }
        </div>
        <div className='flex items-center w-[7%] justify-between text-[14px]'>
            <li onClick={nextPage}><a href='#'>Next</a></li>
            <FaArrowRight/>
         </div>
    </nav>
  );
} 

export default Pagination;