import * as Yup from 'yup';

interface UserInput {
    mainCategory: string,
    subCategory: string,
    text: string,
}
const createYupSchema = <T extends object>(schema: Yup.ObjectSchema<T>): Yup.ObjectSchema<T> => schema;

export const categorySchema = createYupSchema<UserInput>(
    Yup.object().shape({
        mainCategory: Yup.string()
            .required('Main Category is required'),
        subCategory: Yup.string()
            .required('Sub Category is required'),
        text: Yup.string()
            .required('Category Name is required')
            .matches(/^[a-zA-Z\s]+$/, 'Name must only contain letters')
    }),
)