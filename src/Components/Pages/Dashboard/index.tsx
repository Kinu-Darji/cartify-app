import React from 'react';
import Dashboardboxes from '../../Dashboardboxes';
import { FaHandsClapping } from "react-icons/fa6";
import { Button } from '@mui/material';
import { FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Dashboard:React.FC= () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full p-5 border bg-white rounded-lg border-[rgba(0,0,0,0.1)] flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-5">
        <div className="info ">
          <h1 className="inline-flex items-center gap-2 text-xl md:text-2xl font-bold flex-wrap p-4 pl-2">
            HELLO, Admin!
            <FaHandsClapping className="text-[30px] md:text-[40px] text-yellow-500" />
          </h1>
          <br className="hidden md:block" />
          <Button className="btn-blue !capitalize mt-3  md:mt-0" onClick={() => navigate('/productupload')}>
            <FaPlus />
            Add Products
          </Button>
        </div>
      </div>

      <Dashboardboxes />
    </>
  );
};

export default Dashboard;
