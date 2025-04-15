import React, { useState, ChangeEvent } from 'react';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../Firebase/Firebase';
import { productSchema } from '../../Schemas/Formvalidation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ProductFormValues {
  name: string;
  description: string;
  price: string; 
  categoryId: string;
  subcategoryId: string;
  quantity: string;
  sizeId: string;
}

const Productupload: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik<ProductFormValues>({
    initialValues: {
      name: '',
      description: '',
      price: '',
      categoryId: '',
      subcategoryId: '',
      quantity: '',
      sizeId: '',
    },
    validationSchema: productSchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        const staticImageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlndpwDalSNF8TzBG6T7kGv73l0IOReNJpKw&s';

        await addDoc(collection(db, 'products'), {
          ...values,
          price: Number(values.price),
          categoryId: Number(values.categoryId),
          subcategoryId: Number(values.subcategoryId),
          quantity: Number(values.quantity),
          imageUrl: staticImageUrl,
          createdAt: serverTimestamp(),
        });

        // alert('Product uploaded successfully!');
        toast.success('Product upload successfully!', {
        position: "top-center",
        autoClose: 3000,
        });
        resetForm();
      } catch (error: any) {
        console.error('Upload error:', error.message);
        alert('Failed to upload product: ' + error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-3xl mx-auto">
      <ToastContainer/>
      <h2 className="text-3xl font-bold mb-4 font-mono">Add New Product</h2>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <TextField
          label="Product Name"
          variant="outlined"
          fullWidth
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          name="description"
          multiline
          rows={2}
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />

        <div className="flex gap-4">
          <TextField
            label="Price"
            variant="outlined"
            name="price"
            type="number"
            className="w-1/2"
            value={formik.values.price}
            onChange={formik.handleChange}
            error={formik.touched.price && Boolean(formik.errors.price)}
            helperText={formik.touched.price && formik.errors.price}
          />
          <TextField
            label="Category ID"
            variant="outlined"
            name="categoryId"
            type="number"
            className="w-1/2"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
            error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
            helperText={formik.touched.categoryId && formik.errors.categoryId}
          />
        </div>

        <div className="flex gap-4">
          <TextField
            label="Subcategory ID"
            variant="outlined"
            name="subcategoryId"
            type="number"
            className="w-1/2"
            value={formik.values.subcategoryId}
            onChange={formik.handleChange}
            error={formik.touched.subcategoryId && Boolean(formik.errors.subcategoryId)}
            helperText={formik.touched.subcategoryId && formik.errors.subcategoryId}
          />
          <TextField
            label="Quantity"
            variant="outlined"
            name="quantity"
            type="number"
            className="w-1/2"
            value={formik.values.quantity}
            onChange={formik.handleChange}
            error={formik.touched.quantity && Boolean(formik.errors.quantity)}
            helperText={formik.touched.quantity && formik.errors.quantity}
          />
        </div>

        <TextField
          label="Size ID"
          variant="outlined"
          name="sizeId"
          className="w-1/2"
          value={formik.values.sizeId}
          onChange={formik.handleChange}
          error={formik.touched.sizeId && Boolean(formik.errors.sizeId)}
          helperText={formik.touched.sizeId && formik.errors.sizeId}
        />

        <div>
          <label className="block mb-2 font-medium text-gray-700">Product Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          className="!bg-blue-600 hover:!bg-blue-700 text-white"
        >
          {loading ? 'Uploading...' : 'Add Product'}
        </Button>
      </form>
    </div>
  );
};

export default Productupload;
