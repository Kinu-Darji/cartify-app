import './App.css';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Header from './Components/Header';
import Sidebar from './Sidebar';
import Dashboard from './Components/Pages/Dashboard';


function App() {
  const router =createBrowserRouter([
    {
      path:"/",
      element:<>
      <section>
        <Header/>
        <div className='contentMain flex'>
          <div className='sidebarWrapper w-[18%]'>
            <Sidebar/>
          </div>
          <div className='contentRight py-3 px-5 w-[82%]'>
            <Dashboard/>
          </div>
        </div>
      </section>
      </>
    }
  ])
  return (
    <>
    <RouterProvider router={router}/>
    </>
  );
}

export default App;
