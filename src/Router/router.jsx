import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Login from '../Authentication/Login/Login';
import Register from '../Authentication/Register/Register';
import Home from '../page/Home/Home';

const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout></Layout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
              path:'/register',
              element:<Register></Register>
            }
            
        ]
    }
])

export default router;