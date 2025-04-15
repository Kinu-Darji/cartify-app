import React, { useState, useEffect } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import { MdCancel } from "react-icons/md";

interface User {
  id?: string;
  name: string;
  email: string;
  Phone: number; 
  gender: string;
}

const User: React.FC = () => {
  const [user, setUser] = useState<User[]>([]);
  const [filteredsearch, setFilteredsearch] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const docRef = await getDocs(collection(db, 'userData')); 
      const userList: User[] = docRef.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<User, 'id'>),
      }));
      setUser(userList);
      setFilteredsearch(userList);
    } catch (error) {
      console.error("Error fetching user:", error);
    }finally{
      setLoading(false);
    }
  };

  const searhfilterd=()=>{
    const filteres=user.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredsearch(filteres);
  }
  const handleclear=()=>{
    setSearchTerm('');
    setFilteredsearch(user);
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-white p-4 rounded-md shadow-sm w-full max-w-4xl">
        <input
          type="text"
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 text-sm"
          placeholder='Search Here...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          type="submit"
          className="bg-gray-800 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          onClick={searhfilterd}
        >
          Search
        </button>
        <MdCancel className='size-10 cursor-pointer' onClick={handleclear}/>
      </div>
      <div className="border-1 border-grey-900 shadow-slate-50 mt-5">
      <TableContainer className='mb-5'>
        <Table aria-label="user table" sx={{ minWidth: 650 }} className="bg-white">
          <TableHead>
            <TableRow className="bg-black">
              <TableCell sx={{ color: 'white', borderRight: '1px solid gray' }}>
                <strong>NAME</strong>
              </TableCell>
              <TableCell sx={{ color: 'white', borderRight: '1px solid gray' }}>
                <strong>EMAIL</strong>
              </TableCell>
              <TableCell sx={{ color: 'white', borderRight: '1px solid gray' }}>
                <strong>PHONE NUMBER</strong>
              </TableCell>
              <TableCell sx={{ color: 'white', borderRight: '1px solid gray' }}>
                <strong>GENDER</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredsearch.map((user, index) => (
              <TableRow key={index}>
                <TableCell sx={{borderRight: '1px solid gray',
                      color: 'black',
                      fontFamily: 'Arial',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 'medium'}}>{user.name}</TableCell>
                <TableCell sx={{borderRight: '1px solid gray',
                      color: 'black',
                      fontFamily: 'Arial',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 'medium'}}>{user.email}</TableCell>
                <TableCell sx={{borderRight: '1px solid gray',
                      color: 'black',
                      fontFamily: 'Arial',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 'medium'}}>{user.Phone}</TableCell>
                <TableCell sx={{borderRight: '1px solid gray',
                      color: 'black',
                      fontFamily: 'Arial',
                      fontSize: '16px',
                      fontStyle: 'normal',
                      fontWeight: 'medium'}}>{user.gender}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    </div>
  );
};

export default User;
