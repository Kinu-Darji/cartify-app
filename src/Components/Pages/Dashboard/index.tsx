import React from 'react'
import Dashboardboxes from '../../Dashboardboxes';
import { FaHandsClapping } from "react-icons/fa6";
import { Button } from '@mui/material';
import { FaPlus } from "react-icons/fa";

const Dashboard = () => {
  return (
  <>
  <div className="w-full p-5 border bg-white border-[rgba(0,0,0,0.1)] flex items-center gap-8 mb-5">
  <div className="info">
    <h1 className="inline-flex items-center gap-2 text-2xl font-bold">
      Good Morning, Admin!  
      <FaHandsClapping className="text-[40px] text-yellow-500" />
    </h1>
    <br/><br/>
    <Button className='btn-blue !capitalize'><FaPlus/>Add Products</Button>
  </div>
</div>

  <Dashboardboxes/>
  </>
  )
}

export default Dashboard;