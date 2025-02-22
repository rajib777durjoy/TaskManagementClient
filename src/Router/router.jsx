import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Login from '../Authentication/Login/Login';
import Register from '../Authentication/Register/Register';
import Home from '../page/Home/Home';

const router = createBrowserRouter([
    {
        path:'/login',
        element:<Login></Login>
    },
    {
      path:'/register',
      element:<Register></Register>
    },
    {
        path:'/layout',
        element:<Layout></Layout>,
        children:[
            {
                index:true,
                element:<Home></Home>
            },
            
        ]
    }
])

export default router;