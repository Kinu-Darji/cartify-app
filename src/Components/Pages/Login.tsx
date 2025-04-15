import React, { useState } from 'react';
import adminpage from "../../assets/adminpage.png";
import {login} from "../Schemas/Login"
import {
    Button,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    TextField
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { RiAdminFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/Firebase';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "../Pages/Forgetpass";
import { useFormik } from 'formik';

const Login: React.FC = () => {
    const [email, setemail] = useState<string>('');
    const [password, setpassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const navigate = useNavigate();

    const handlelogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
            toast.success("Login Successful", {
                position: "top-center",
                autoClose: 3000,
            });
        } catch (error) {
           toast.error("login Failed" + error);
        }
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    // const formik=useFormik<login>({
    //     initialValues:{
    //         email:"",
    //         password:""
    //         },
    //         onSubmit:values=>{
    //             handlelogin(values);
    // })

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-100'>
            <ToastContainer />
            <div className='relative w-full max-w-5xl flex shadow-lg'>
                <div className='absolute inset-y-0 left-1/2 -translate-x-1/2 w-[100px] bg-gray-600 z-0'></div>
                <div className='w-1/2 bg-gray-700 z-10 p-10 flex flex-col justify-center items-center text-white'>
                    <div className='mb-6'>
                        <RiAdminFill className='w-9 h-9' />
                    </div>
                    <h2 className='text-3xl font-bold mb-4'>Welcome Admin</h2>
                    <img src={adminpage} alt="admin_page_pic" className='' />
                </div>
                <div className='w-1/2 bg-white z-10 p-10 flex flex-col justify-center'>
                    <h2 className='text-2xl font-mono font-semibold mb-6 text-center text-gray-500'>Log In</h2>
                    <p className='mb-4 text-sm text-gray-500'>Please login to access your account</p>
                    <form className='space-y-4' onSubmit={handlelogin}>
                        <div>
                            <TextField
                                label="Email"
                                variant="outlined"
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 border border-gray-300 rounded"
                                onChange={(e) => setemail(e.target.value)}
                                required
                            />
                        </div>
                        <FormControl className="w-full" variant="outlined">
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <OutlinedInput
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setpassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleTogglePassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                required
                            />
                        </FormControl>
                        <div className='flex items-center justify-between'>
                            <label className='flex items-center text-sm'>
                                <input type="checkbox" className='mr-2' />
                                <span className="ml-2 text-gray-900">Remember me</span>
                            </label>
                            <a href="/Forgetpass" className="text-sm text-gray-900 hover:underline">
                                Forgot password?
                            </a>
                        </div>
                        <Button
                            type="submit"
                            className='w-full py-2 !bg-gray-900 !text-white rounded-lg hover:!bg-gray-300 transition mb-3'
                        >
                            LOGIN
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
