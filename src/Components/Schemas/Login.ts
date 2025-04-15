import * as Yup from 'yup';

interface UserInput{
    email: string;
    password: string;
}

const createYupSchema = <T extends object>(schema: Yup.ObjectSchema<T>): Yup.ObjectSchema<T> => schema;


export const login = createYupSchema<UserInput>(
    Yup.object().shape({
        email: Yup.string().email('Invalid email format (eg.,example@domain.com)').required('Email is required'),
        password: Yup.string()
        .min(8,"Password must be at least 8 characters")
        .matches(/[A-Z]/,"password must have atlest one uppercase letter")
        .matches(/\d/,"password must have atleast one number")
        .matches(/[!@#$%^&*(),.?":{}|<>]/,"password must have atleast one special character")
        .required('Password is required')
    })
);