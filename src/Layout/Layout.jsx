import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import useAuth from '../Hook/useAuth';

const Layout = () => {
    const {toggle}=useAuth()
    console.log('toggle',toggle)
    return (
        <div className='bg-gray-800 w-[100%] min-h-screen'>
            <Navbar></Navbar>
            <div className='flex'>
            <div className='md:w-[10%] w-[20%] text-center pb-10 relative '>
                <div className='w-[100%] absolute bottom-20  '>
                <Link to='/'><li className='text-white list-none my-4 text-xl hover:bg-gray-500'>Home</li></Link>
                <Link to='/'><li className='text-white list-none my-4 text-xl hover:bg-gray-500'>Setting</li></Link>
                <Link to='/'><li className='text-white list-none my-4 text-xl hover:bg-gray-500'>Profile</li></Link>
                </div>
                
            
            </div>
            <Outlet></Outlet>
            </div>
           
        </div>
    );
};

export default Layout;