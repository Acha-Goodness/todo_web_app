import React from 'react';
import { GoGear } from "react-icons/go";
import { BsBell } from "react-icons/bs";
import avatar from "../../assets/Avatar.png"


const Header = () => {
  return (
    <div className="bg-[white] py-5 border-b-2 border-blue-500 flex items-center justify-between px-[4%]">
      <div>
         <h3 className="text-[24px] font-medium">Todo</h3>
      </div>
      <div className="flex items-center w-[10%] justify-between">
        <GoGear />
        <BsBell />
        <img src={avatar} alt="..."/>
      </div>
    </div>
  )
}

export default Header;
