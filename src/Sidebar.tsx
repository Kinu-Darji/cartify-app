import React, { useState } from 'react';
// import logo from "../assets/logo.png";
import logo from "../src/assets/logo.png"
import { Button } from '@mui/material';
import { MdDashboard } from "react-icons/md";
import { PiUsersFill } from "react-icons/pi";
import { GrProductHunt } from "react-icons/gr";
import { TbCategoryFilled } from "react-icons/tb";
import { IoLogOut } from "react-icons/io5";
import { FaBagShopping, FaAngleDown } from "react-icons/fa6";
import { Collapse } from 'react-collapse';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [submenuIndex, setSubmenuIndex] = useState<number | null>(null);

  const isOpenSubMenu = (index: number) => {
    setSubmenuIndex(submenuIndex === index ? null : index);
  };

  return (
    <div className='sidebar fixed top-0 left-0 bg-[#fff] w-[18%] h-full border-r border-[rgba(0,0,0,0.1)] py-2 px-4'>
      <div className="flex items-center gap-2">
        <img src={logo} alt="Cartify Logo" className="w-[100px] h-[100px]" />
        <h3 className="text-lg font-bold pr-[50px] text-gray- gap-4">CARTIFY</h3>
      </div>

      <ul className='mt-4'>
        <li>
          <Link to="/Dashboard">
          <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-4 hover:bg-gray-200'>
            <MdDashboard className='text-[16px] items-center' />
            <span>Dashboard</span>
          </Button>
          </Link>
        </li>
      </ul>

      <ul className='mt-4'>
        <li>
          <Link to="/Users">
          <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-4 hover:bg-gray-200'>
            <PiUsersFill className='text-[20px] items-center' />
            <span>Users</span>
          </Button>
          </Link>
        </li>
      </ul>

      <ul className='mt-4'>
        <li>
          <Button 
            className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-4 hover:bg-gray-200'
            onClick={() => isOpenSubMenu(1)}
          >
            <GrProductHunt className='text-[20px] items-center' />
            <span>Products</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
              <FaAngleDown className={`transition-all ${submenuIndex === 1 ? 'rotate-180' : ''}`} />
            </span> 
          </Button>
         

          <Collapse isOpened={submenuIndex === 1}>
            <ul className="w-full">
              <li className="w-full">
                <Link to="/Products/list">
                <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Product List
                </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/Products/upload">
                <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Product Upload
                </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
      </ul>

      <ul className='mt-4'>
        <li>
          
          <Button 
            className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-4 hover:bg-gray-200'
            onClick={() => isOpenSubMenu(2)}
          >
            <TbCategoryFilled className='text-[20px] items-center' />
            <span>Category</span>
            <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center'>
              <FaAngleDown className={`transition-all ${submenuIndex === 2 ? 'rotate-180' : ''}`} />
            </span>
          </Button>
         

          <Collapse isOpened={submenuIndex === 2}>
            <ul className="w-full">
              <li className="w-full">
                <Link to="/category/list">
                <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Category List
                </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/category/add">
                <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Add Category List
                </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/category/sublist">
                <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                  Sub Category List
                </Button>
                </Link>
              </li>
              <li className="w-full">
                <Link to="/category/sublist/add">
                <Button className="!text-[rgba(0,0,0,0.7)] !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3">
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(0,0,0,0.1)]"></span>
                   Add Sub Category List
                </Button>
                </Link>
              </li>
            </ul>
          </Collapse>
        </li>
      </ul>

      <ul className='mt-4'>
        <li>
          <Link to ="/orders">
          <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-4 hover:bg-gray-200'>
            <FaBagShopping className='text-[20px] items-center' />
            <span>Orders</span>
          </Button>
          </Link>
        </li>
      </ul>

      <ul className='mt-4'>
        <li>
          <Link to ="/logout">
          <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-[rgba(0,0,0,0.8)] !font-[600] !py-4 hover:bg-gray-200'>
            <IoLogOut className='text-[20px] items-center' />
            <span>Logout</span>
          </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
