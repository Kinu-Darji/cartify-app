import {
  TableContainer, Table, TableHead, TableRow, TableCell,
  TableBody, Avatar, Button, TextField
} from '@mui/material';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../../Firebase/Firebase';
import { MdCancel } from "react-icons/md";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  subcategoryId: string;
  quantity: number;
  sizeId: any;
  imageUrl: string;
}

const Productlist: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredsearch, setFilteredsearch] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editedProduct, setEditedProduct] = useState<Partial<Product>>({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const docRef = await getDocs(collection(db, 'products'));
      const productList: Product[] = docRef.docs.map(doc => ({
        id: doc.id,
        ...(doc.data() as Omit<Product, 'id'>),
      }));
      setProducts(productList);
      setFilteredsearch(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = () => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredsearch(filtered);
  };

  const handleClear = () => {
    setSearchTerm('');
    setFilteredsearch(products);
  };

  const handleEdit = (product: Product) => {
    setEditId(product.id || null);
    setEditedProduct({ ...product });
  };

  const handleSave = async () => {
    if (editId) {
      try {
        const productRef = doc(db, 'products', editId);
        const { id, imageUrl, ...updateData } = editedProduct;

        const formattedData = {
          ...updateData,
          price: Number(updateData.price),
          quantity: Number(updateData.quantity),
        };

        await updateDoc(productRef, formattedData);
        setEditId(null);
        setEditedProduct({});
        toast.success('Successfully saved product!', {
          position: "top-center",
          autoClose: 3000,
        });
        fetchProducts();
      } catch (error) {
        toast.error("Failed to save product", {
          position: "top-center"
        });
        console.error("Save error:", error);
      }
    }
  };
  const handleDelete = async (productId: string | undefined) => {
    if (!productId) return;
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;
  
    try {
      const productRef = doc(db, 'products', productId);
      await deleteDoc(productRef);
      toast.error(" Product deleted successfully!", {
        position: "top-center",
        autoClose: 3000,
        
      });
      fetchProducts();
    } catch (error) {
      toast.error(" Failed to delete product", {
        position: "top-center"
      });
      console.error("Delete error:", error);
    }
  };
  

  return (
    <div>
     
      <ToastContainer />

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
          onClick={handleSearch}
        >
          Search
        </button>
        <MdCancel className='size-10 cursor-pointer' onClick={handleClear} />
      </div>

      <div className='border-1 border-grey-900 shadow-slate-50 mt-5'>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} className='bg-white'>
            <TableHead>
              <TableRow className='bg-black'>
                {['IMAGE', 'NAME', 'DESCRIPTION', 'PRICE', 'CATEGORY ID', 'SUB CATEGORY ID', 'QUANTITY', 'SIZE', 'ACTION'].map(header => (
                  <TableCell key={header} sx={{ borderRight: '1px solid gray', color: 'white' }}>
                    <strong>{header}</strong>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredsearch.map((product) => (
                <TableRow key={product.id}>
                  <TableCell sx={{ borderRight: '1px solid gray' }}>
                    <Avatar src={product.imageUrl} alt={product.name} sx={{ width: 100, height: 100 }} />
                  </TableCell>

                  {['name', 'description', 'price', 'categoryId', 'subcategoryId', 'quantity', 'sizeId'].map((field) => (
                    <TableCell key={field} sx={{ borderRight: '1px solid gray' }}>
                      {editId === product.id ? (
                        <TextField
                          value={editedProduct[field as keyof Product] ?? ''}
                          onChange={(e) =>
                            setEditedProduct({
                              ...editedProduct,
                              [field]: e.target.value,
                            })
                          }
                          size="small"
                          variant="outlined"
                        />
                      ) : (
                        product[field as keyof Product]
                      )}
                    </TableCell>
                  ))}

                  <TableCell sx={{ borderRight: '1px solid gray' }}>
                    {editId === product.id ? (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={handleSave}
                        sx={{ mr: 1, mb: 1 }}
                      >
                        Save
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(product)}
                        sx={{ mr: 1, mb: 1 }}
                      >
                        Edit
                      </Button>
                    )}
                    <Button variant="contained" color="error" size="small"  onClick={()=> handleDelete(product.id)}>
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

export default Productlist;
