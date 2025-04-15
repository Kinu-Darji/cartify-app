import React, { useState, useContext } from 'react';
import shoppin_logo from "../src/assets/shopping_logo-removebg-preview.png";
import { Button } from '@mui/material';
import { MdDashboard } from "react-icons/md";
import { PiUsersFill } from "react-icons/pi";
import { GrProductHunt } from "react-icons/gr";
import { TbCategoryFilled } from "react-icons/tb";
// import { IoLogOut } from "react-icons/io5";
import { FaBagShopping, FaAngleDown } from "react-icons/fa6";
import { Collapse } from 'react-collapse';
import {  useNavigate } from 'react-router-dom';
import { cartifycontext } from "../src/Context/Context";

const Sidebar:React.FC = () => {
  const navigate = useNavigate();
  const cartifyCtx = useContext(cartifycontext);
  const [submenuIndex, setSubmenuIndex] = useState<number | null>(null);

  if (!cartifyCtx) {
    throw new Error("cartifycontext must be used within a CartifyProvider");
  }

  const { issidebarOpen } = cartifyCtx;

  const isOpenSubMenu = (index: number) => {
    setSubmenuIndex(submenuIndex === index ? null : index);
  };

  return (
    <div
      className={`fixed top-0 left-0 bg-gray-900 h-full border-r border-[rgba(0,0,0,0.1)] 
      py-2 px-4 transition-all duration-300 
      ${issidebarOpen ? 'w-[18%]' : 'w-[60px]'}`}
    >
      
      <div className="flex items-center gap-2 mb-4">
        <img src={shoppin_logo} alt="Cartify Logo" className="w-[50px] h-[50px]" />
        {issidebarOpen && (
          <h3 className="text-2xl font-bold pr-[20px] text-white">CARTIFY</h3>
        )}
      </div>

      
      <ul className='mt-4'>
        <li>
          <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-white !font-[600] !py-4 hover:bg-gray-700'
            onClick={() => navigate('/')}>
            <MdDashboard className='text-[16px]' />
            {issidebarOpen && <span className='font-mono text-xl'>Dashboard</span>}
          </Button>
        </li>
      </ul>

      
      <ul>
        <li>
          <Button className='w-full font-mono !capitalize !justify-start flex gap-3 text-[14px] !text-white !font-[600] !py-4 hover:bg-gray-700'
            onClick={() => navigate('/user')}>
            <PiUsersFill className='text-[20px]' />
            {issidebarOpen && <span className='font-mono text-xl'>Users</span>}
          </Button>
        </li>
      </ul>

      
      <ul>
        <li>
          <Button
            className='w-full font-mono !capitalize !justify-start flex gap-3 text-[14px] !text-white !font-[600] !py-4 hover:bg-gray-700'
            onClick={() => isOpenSubMenu(1)}
          >
            <GrProductHunt className='text-[20px]' />
            {issidebarOpen && (
              <>
                <span className='font-mono text-xl'>Products</span>
                <span className='ml-auto font-mono text-xl w-[30px] h-[30px] flex items-center justify-center'>
                  <FaAngleDown className={`transition-all ${submenuIndex === 1 ? 'rotate-180' : ''}`} />
                </span>
              </>
            )}
          </Button>

          <Collapse isOpened={submenuIndex === 1 && issidebarOpen}>
            <ul className="w-full">
              <li>
                <Button className="!text-white !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3"
                  onClick={() => navigate('/productlist')}>
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(255,255,255,0.5)]"></span>
                  Product List
                </Button>
              </li>
              <li>
                <Button className="!text-white !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3"
                  onClick={() => navigate('/productupload')}>
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(255,255,255,0.5)]"></span>
                  Product Upload
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>
      </ul>

      
      <ul>
        <li>
          <Button
            className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-white !font-[600] !py-4 hover:bg-gray-700'
            onClick={() => isOpenSubMenu(2)}
          >
            <TbCategoryFilled className='text-[20px]' />
            {issidebarOpen && (
              <>
                <span className='font-mono text-xl'>Category</span>
                <span className='ml-auto w-[30px] h-[30px] flex items-center justify-center '>
                  <FaAngleDown className={`transition-all text-2xl ${submenuIndex === 2 ? 'rotate-180' : ''}`} />
                </span>
              </>
            )}
          </Button>

          <Collapse isOpened={submenuIndex === 2 && issidebarOpen}>
            <ul className="w-full">
              <li>
                <Button className="!text-white !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3"
                  onClick={() => navigate('/categorylist')}>
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(255,255,255,0.5)]"></span>
                  Category List
                </Button>
              </li>
              <li>
                <Button className="!text-white !capitalize !justify-start !w-full !text-[13px] !font-[500] !pl-9 flex gap-3"
                  onClick={() => navigate('/addcategory')}>
                  <span className="block w-[5px] h-[5px] rounded-full bg-[rgba(255,255,255,0.5)]"></span>
                  Add Category
                </Button>
              </li>
            </ul>
          </Collapse>
        </li>
      </ul>

     
      <ul>
        <li>
          <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-white !font-[600] !py-4 hover:bg-gray-700'
            onClick={() => navigate('/oders')}>
            <FaBagShopping className='text-[20px]' />
            {issidebarOpen && <span className='font-mono text-xl'>Orders</span>}
          </Button>
        </li>
      </ul>

      
      {/* <ul>
        <li>
            <Button className='w-full !capitalize !justify-start flex gap-3 text-[14px] !text-white !font-[600] !py-4 hover:bg-gray-700'
            onClick={() => navigate('/logout')}>
              <IoLogOut className='text-[20px]' />
              {issidebarOpen && <span className='font-mono text-xl'>Logout</span>}
            </Button>
        </li>
      </ul> */}
    </div>
  );
};

export default Sidebar;
