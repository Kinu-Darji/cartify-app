import * as Yup from 'yup';

type UserInput = {
  name: string;
  price: number;
  description: string;
  categoryId: number;
  subcategoryId: number;
  quantity: number;
  sizeId: any;
};

const createYupSchema = <T extends object>(schema: Yup.ObjectSchema<T>): Yup.ObjectSchema<T> => schema;

export const productSchema = createYupSchema<UserInput>(
  Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Name must only contain letters')
      .required('Name is required'),

    price: Yup.number()
      .required('Price is required')
      .positive('Price must be a positive number'),

    description: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, 'Description must only contain letters')
      .required('Description is required'),

    categoryId: Yup.number()
      .required('Category ID is required')
      .positive('Category ID must be a positive number'),

    subcategoryId: Yup.number()
      .required('Subcategory ID is required')
      .positive('Subcategory ID must be a positive number'),

    quantity: Yup.number()
      .required('Quantity is required')
      .positive('Quantity must be a positive number'),

    sizeId: Yup.string()
      .required('Size ID is required'),  
  })
);
