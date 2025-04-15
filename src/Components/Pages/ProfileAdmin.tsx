import { Button } from '@mui/material'
import React from 'react'
import admin from "../../assets/images.jpeg"

const ProfileAdmin:React.FC = () => {
  return (
    <div className='p-6 space-y-6 bg-gray-100 min-h-screen'>
     <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">My Profile</h2>
        <div className="flex items-center space-x-6">
          <img
            src={admin}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">KREENA</h3>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </div>
        <div className='bg-white rounded-xl shadow p-6'>
          <div className='flex justify-between items-center mb-4'>
            <h3 className='text-md font-semibold text-gray-700'>Personal information</h3>
            <Button className='text-gray-600 hover:text-gray-200 flex items-center gap-2 text-sm '>Edit</Button>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600'>
            <div>
              <p className='font-medium text-gray-500'>First Name</p>
              <p className='text-gray-600'>Kreena</p>
            </div>
            <div>
              <p className='font-medium text-gray-500'>Last Name</p>
              <p className='text-gray-600'>Darji</p>
            </div>
            <div>
              <p className='font-medium text-gray-500'>Date of Birth</p>
              <p className='text-gray-600'>05/08/2002</p>
            </div>
            <div>
              <p className='font-medium text-gray-500'>Role</p>
              <p className='text-gray-600'>Admin</p>
            </div>
            <div>
              <p className='font-medium text-gray-500'>Email-add</p>
              <p className='text-gray-600'>admin123@gmail.com</p>
            </div>
            <div>
              <p className='font-medium text-gray-500'>Phone Number</p>
              <p className='text-gray-600'>9852364712</p>
            </div>
          </div>
          </div>
          <div className='bg-white rounded-xl shadow p-6'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-md font-semibold text-gray-700'>Address</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600'>
              <div>
                <p>Trentiums Solution</p>
              </div>
            </div>
            </div>
    </div>
  )
}

export default ProfileAdmin