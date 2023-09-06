import React, { useState } from 'react';
import { GoGear } from "react-icons/go";
import { BsBell } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import avatar from "../../assets/Avatar.png"


const Header = () => {
  const [ showNav, setShowNav ] = useState<boolean>(false)

  const toggleShowNav = () => {
    setShowNav(!showNav)
  }


  return (
    <div className="bg-[white] py-5 border-b-2 border-blue-500 flex items-center justify-between px-[4%]">
      <div>
         <h3 className="text-[24px] font-medium">Todo</h3>
      </div>
      <div className={`bg-[#3F5BF6] sm:bg-[white] text-[white] text-[30px] font-extrabold sm:text-[20px] font-bold sm:text-[black] py-4 sm:py-0 absolute left-0 duration-200 ease-in-out ${showNav ? "top-[14%]" : "top-[-30%] duration-100"} sm:static flex items-center w-[100%] sm:w-[10%] justify-evenly sm:justify-between`}>
        <GoGear/>
        <BsBell/>
        <img src={avatar} alt="..."/>
      </div>
      <div className='sm:hidden' onClick={toggleShowNav}>
        <GiHamburgerMenu/>
      </div>
    </div>
  )
}

export default Header;
