import React, { useEffect, useState } from 'react';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, CircularProgress, TextField } from '@mui/material'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../Firebase/Firebase';
import { MdCancel } from "react-icons/md";
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { toast ,ToastContainer} from 'react-toastify';

interface Category {
  id?: string;
  mainCategory: string;
  subCategory: string;
  text: string;
}

const Categorylist:React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredsearch, setFilteredsearch] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editedCategory, setEditedCategory] = useState<Partial<Category>>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const docRef = await getDocs(collection(db, 'categories'));
      const categoryList: Category[] = docRef.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Category, 'id'>),
      }));
      setCategories(categoryList);
      setFilteredsearch(categoryList);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    } 
  };
  const handlesearch=()=>{
    const filteres=categories.filter((categories) => categories.mainCategory.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredsearch(filteres);
  }
  const handleclear=()=>{
    setSearchTerm('');
    setFilteredsearch(categories);
  }

  const handleEdit =(category : Category)=>{
    setEditId(category.id || null);
    setEditedCategory({...category});
  }

  const handleSave = async (category: Category) => {
    if(editId){
      try{
        const docRef = doc (db,'categories',editId);
        await updateDoc(docRef,editedCategory);
        setEditId(null);
        setEditedCategory({});
        toast.success("Category updated successfully!",{
          position :"top-center",
          autoClose: 3000,
        })
        fetchCategories();
      }catch(error){
        console.error("Error updating category:", error);
        toast.error("Error updating category:");
      }
    }
  }

  const handledelete= async (id: string) => {
    if(!id) return;
    try{
      await deleteDoc(doc(db,'categories',id));
      toast.error("Category deleted successfully!");
      fetchCategories();
    }catch(error){
      console.error("Error deleting category:", error);
      toast.error("Error deleting category:");
    }
  }

  return (
    <div>
      <ToastContainer/>
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-white p-4 rounded-md shadow-sm w-full max-w-4xl">

        <input
          type="text"
          placeholder="Search Here..."
          className="flex-grow border border-gray-300 rounded-md px-4 py-2 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <button
          type="submit"
          className="bg-gray-800 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          onClick={handlesearch}
        >
          Search
        </button>
        <MdCancel className='size-10 cursor-pointer' onClick={handleclear}/>
      </div>

      <div className="border-1 border-grey-900 shadow-slate-50 mt-5">
        <TableContainer>
          <Table aria-label="category table" sx={{ minWidth: 650 }} className="bg-white">
            <TableHead>
              <TableRow className="bg-black">
                <TableCell sx={{ color: 'white', borderRight: '1px solid gray' }}>
                  <strong>Main Category</strong>
                </TableCell>
                <TableCell sx={{ color: 'white', borderRight: '1px solid gray' }}>
                  <strong>Sub Category</strong>
                </TableCell>
                <TableCell sx={{ color: 'white', borderRight: '1px solid gray' }}>
                  <strong>Category Description</strong>
                </TableCell>
                <TableCell sx={{ color: 'white', borderRight: '1px solid gray' }}>
                  <strong>Action</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredsearch.map((cat) => (
                <TableRow key={cat.id}>
                  {['mainCategory', 'subCategory', 'text'].map((field) => (
                    <TableCell
                      key={field}
                      sx={{
                        borderRight: '1px solid gray',
                        color: 'black',
                        fontSize: '16px',
                      }}
                    >
                      {editId === cat.id ? (
                        <TextField
                          size="small"
                          value={editedCategory[field as keyof Category] ?? ''}
                          onChange={(e) =>
                            setEditedCategory({
                              ...editedCategory,
                              [field]: e.target.value,
                            })
                          }
                        />
                      ) : (
                        cat[field as keyof Category]
                      )}
                    </TableCell>
                  ))}

                  <TableCell sx={{ borderRight: '1px solid gray' }}>
                    {editId === cat.id ? (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => handleSave(cat)}
                        sx={{ mr: 1 }}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(cat)}
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => cat.id && handledelete(cat.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Categorylist;
