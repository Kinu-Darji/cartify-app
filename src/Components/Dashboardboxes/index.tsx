import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';

import { FiGift } from 'react-icons/fi';
import { IoStatsChart } from 'react-icons/io5';
import { AiOutlineStock } from 'react-icons/ai';
import { FaProductHunt } from 'react-icons/fa'; 
import { BiSolidCategoryAlt } from 'react-icons/bi';



const Dashboardboxes = () => {
  return (
    <>
    <Swiper
       slidesPerView={4}
       spaceBetween={10}
        navigation={true}
        modules={[ Navigation]}
        className="dashboardboxesslider"
      >
        <SwiperSlide>
            <div className='box p-5 cursor-pointer bg-white hover:bg-slate-200 rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
            <FiGift className='text-[40px] text-blue-500' />
                <div className='info w-[70%] '>
                    <h3>New Orders</h3>
                    <p>1300</p>
                </div>
                <IoStatsChart  className='text-[40px] text-blue-500'/>
            </div>
        </SwiperSlide>

        <SwiperSlide>
            <div className='box p-5 cursor-pointer bg-white hover:bg-slate-200 rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
            <AiOutlineStock className='text-[40px] text-green-500' />
                <div className='info w-[70%] '>
                    <h3>Stock</h3>
                    <p>1300</p>
                </div>
                <IoStatsChart  className='text-[40px] text-green-500'/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='box p-5 cursor-pointer bg-white hover:bg-slate-200 rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
            <FaProductHunt className='text-[40px] text-purple-500' />
                <div className='info w-[70%] '>
                    <h3>Total Products</h3>
                    <p>1300</p>
                </div>
                <IoStatsChart  className='text-[40px] text-purple-500'/>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <div className='box p-5 cursor-pointer bg-white hover:bg-slate-200 rounded-md border border-[rgba(0,0,0,0.1)] flex items-center gap-4'>
            <BiSolidCategoryAlt className='text-[40px] text-red-500' />
                <div className='info w-[70%] '>
                    <h3>Total Category</h3>
                    <p>1300</p>
                </div>
                <IoStatsChart  className='text-[40px] text-red-500'/>
            </div>
        </SwiperSlide>
        
        </Swiper>
    </>
  )
}

export default Dashboardboxes;