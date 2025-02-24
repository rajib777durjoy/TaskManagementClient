import React from 'react';
import useAuth from '../../Hook/useAuth';
import { useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { loginUser,google } = useAuth()
    const navigateHome=useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data.email, data.password)
        loginUser(data.email, data.password)
            .then(res => {
                if(res.user){
                    navigateHome('/')
                }
              
                console.log(res.user)
            })
            .catch(err => {
                console.log('error', err)
            })
    }
    const handelGoogle=()=>{
        google()
       .then((res)=>{
        navigateHome('/')
         console.log('res-user',res.user)
       })
   }
    return (
        <div className='w-[100%]'>
            <div className="hero min-h-screen">
                <div className="card bg-gray-600 md:w-[40%] w-[90%] mx-auto shrink-0 shadow-md shadow-slate-900">
                <h1 className='text-center text-2xl font-semibold text-white'>Login Now</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Email</span>
                            </label>
                            <input type="email" {...register("email")} placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-white">Password</span>
                            </label>
                            <input type="password" {...register("password")} placeholder="password" className="input input-bordered" required />
                            
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary">Login</button>
                        </div>
                    </form>
                    <div className='w-[90%] mx-auto '>
                        <button onClick={handelGoogle} className='btn w-[100%] mb-6'><FcGoogle className='text-xl' />Login with Google</button>
                        <p className='my-4 text-center text-white'>Create New Account<Link to='/register'><span className='cursor-pointer text-lg font-medium text-blue-500 hover:text-blue-300 ms-1'>Register</span></Link></p>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Login;