import React, { useState } from "react";
import { Button, TextField, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from "@mui/material";
import { useFormik } from 'formik';
import { categorySchema } from "../../Schemas/Formcategory";
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../Firebase/Firebase';
import {toast,ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CategoryFormValues {
  mainCategory: string;
  subCategory: string;
  text: string;
}

const AddCategory: React.FC = () => {
  const [category, setCategory] = useState({
    mainCategory: "",
    subCategory: "",
    text: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategory((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };


  const formik = useFormik<CategoryFormValues>({
    initialValues: {
      mainCategory: "",
      subCategory: "",
      text: "",
    },
    validationSchema: categorySchema,
    onSubmit: async (values, { resetForm }) => {
      setLoading(true);
      try {
        await addDoc(collection(db, "categories"), {
          ...values,
          mainCategory: values.mainCategory,
          subCategory: values.subCategory,
          text: values.text,
          createdAt: serverTimestamp(),
        });

        toast.success("Category added successfully !",{
          position: "top-center",
          autoClose:3000,
        })
        resetForm();
      } catch (error: any) {
        console.error("Upload error:", error.message);
        alert("Error uploading category: " + error.message);
      } finally {
        setLoading(false);
      }
    },
  })

  return (
    <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto">
      <ToastContainer/>
      <h2 className="text-2xl font-bold mb-4">Add New Category</h2>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>

        <FormControl component="fieldset" >
          <FormLabel component="legend">Select Main Category</FormLabel>
          <RadioGroup name="mainCategory" value={formik.values.mainCategory} onChange={formik.handleChange} row>
            <FormControlLabel value="Men" control={<Radio />} label="Men" />
            <FormControlLabel value="Women" control={<Radio />} label="Women" />
            <FormControlLabel value="Kids" control={<Radio />} label="Kids" />
          </RadioGroup>
          {formik.touched.mainCategory && formik.errors.mainCategory && (
            <p className="text-sm text-red-500">{formik.errors.mainCategory}</p>
          )}
        </FormControl>
        {formik.values.mainCategory && (
          <FormControl component="fieldset" >
            <FormLabel component="legend">Select Sub Category</FormLabel>
            <RadioGroup name="subCategory" value={formik.values.subCategory} onChange={formik.handleChange} row>
              <FormControlLabel value="Top Wear" control={<Radio />} label="Top Wear" />
              <FormControlLabel value="Bottom Wear" control={<Radio />} label="Bottom Wear" />
            </RadioGroup>
            {formik.touched.subCategory && formik.errors.subCategory && (
              <p className="text-sm text-red-500">{formik.errors.subCategory}</p>
            )}
          </FormControl>
        )}

        <TextField
          label="Category Description"
          variant="outlined"
          name="text"
          fullWidth
          value={formik.values.text}
          onChange={formik.handleChange}
          error={formik.touched.text && Boolean(formik.errors.text)}
          helperText={formik.touched.text && formik.errors.text}
        />

        <Button type="submit" variant="contained" color="primary">
          Add Category
        </Button>
      </form>
    </div>
  );
};

export default AddCategory;
