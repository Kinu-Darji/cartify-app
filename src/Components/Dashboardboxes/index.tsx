import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Navigation } from 'swiper/modules';
import { FiGift } from 'react-icons/fi';
import { IoStatsChart } from 'react-icons/io5';
import { AiOutlineStock } from 'react-icons/ai';
// import { FaProductHunt } from 'react-icons/fa';
import { FaRegStar } from "react-icons/fa";
import { BiSolidCategoryAlt } from 'react-icons/bi';

const Dashboardboxes :React.FC= () => {
  const boxClasses =
    'box p-4 sm:p-5 cursor-pointer rounded-md border border-[rgba(0,0,0,0.1)] flex flex-col sm:flex-row items-center gap-3 sm:gap-4 hover:bg-slate-200';

  const iconSize = 'text-[30px] sm:text-[40px]';

  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className="dashboardboxesslider"
        breakpoints={{
          320: {
            slidesPerView: 1,
          },
          480: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        <SwiperSlide>
          <div className={`${boxClasses} bg-blue-500`}>
            <FiGift className={`${iconSize} text-white`} />
            <div className="info w-full sm:w-[70%] text-center sm:text-left">
              <h3 className="text-white text-base sm:text-lg font-semibold">  WISHLIST  </h3>
              <p className="text-white text-sm sm:text-base">1300</p>
            </div>
            <IoStatsChart className={`${iconSize} text-white`} />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`${boxClasses} bg-green-500`}>
            <AiOutlineStock className={`${iconSize} text-white`} />
            <div className="info w-full sm:w-[70%] text-center sm:text-left">
              <h3 className="text-white text-base sm:text-lg font-semibold"> RATINGS </h3>
              <p className="text-white text-sm sm:text-base">1300</p>
            </div>
            <IoStatsChart className={`${iconSize} text-white`} />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`${boxClasses} bg-purple-500`}>
            <FaRegStar className={`${iconSize} text-white`} />
            <div className="info w-full sm:w-[70%] text-center sm:text-left">
              <h3 className="text-white text-base sm:text-lg font-semibold"> REVIEWS </h3>
              <p className="text-white text-sm sm:text-base">1300</p>
            </div>
            <IoStatsChart className={`${iconSize} text-white`} />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className={`${boxClasses} bg-red-500`}>
            <BiSolidCategoryAlt className={`${iconSize} text-white`} />
            <div className="info w-full sm:w-[70%] text-center sm:text-left">
              <h3 className="text-white text-base sm:text-lg font-semibold"> OFFERS </h3>
              <p className="text-white text-sm sm:text-base">1300</p>
            </div>
            <IoStatsChart className={`${iconSize} text-white`} />
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Dashboardboxes;
