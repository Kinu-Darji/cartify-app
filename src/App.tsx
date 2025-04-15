import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Sidebar';
import Dashboard from './Components/Pages/Dashboard';
import Productupload from './Components/Pages/Products/Productupload';
import Addcateogory from './Components/Pages/Categories/Addcategory';
import Productlist from './Components/Pages/Products/Productlist';
import Categorylist from './Components/Pages/Categories/Categorylist';
import User from './Components/Pages/User';
import Orders from './Components/Pages/Order';
import ProfileAdmin from './Components/Pages/ProfileAdmin';
import Login from './Components/Pages/Login';
import ProtectedRoute from '../src/Components/ProductRoute';
import { useEffect } from 'react';
import { auth } from '../src/Firebase/Firebase'; 
import { signOut } from 'firebase/auth';

function Layout() {
  return (
    <section>
      <Header />
      <div className="contentMain flex">
        <div className="sidebarWrapper w-[18%]">
          <Sidebar />
        </div>
        <div className="contentRight py-3 px-5 w-[82%]">
          <Outlet />
        </div>
      </div>
    </section>
  );
}

function AppWrapper() {
  useEffect(() => {
    signOut(auth);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/productupload",
          element: <Productupload />,
        },
        {
          path: "/addcategory",
          element: <Addcateogory />,
        },
        {
          path: "/productlist",
          element: <Productlist />,
        },
        {
          path: "/categorylist",
          element: <Categorylist />,
        },
        {
          path: "/user",
          element: <User />,
        },
        {
          path: "/oders",
          element: <Orders />,
        },
        {
          path: "/profile",
          element: <ProfileAdmin />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default AppWrapper;
