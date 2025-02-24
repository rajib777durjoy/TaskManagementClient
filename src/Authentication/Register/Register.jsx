import React from 'react';
import { useForm } from "react-hook-form"
import { FcGoogle } from 'react-icons/fc';
import useAuth from '../../Hook/useAuth';
import { Link, useNavigate } from 'react-router-dom';
const Register = () => {
    const {createUser,google}=useAuth()
    const navigateLayout= useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm()
      const onSubmit = (data) => {
        console.log(data.email,data.password)
        createUser(data.email,data.password)
        .then(res=>{
            // console.log(res.user)
            if(res.user){
                navigateLayout('/')
            }
            
        })
        .catch(err=>{
            // console.log('error',err)
        })
    }
    const handelGoogle=()=>{
         google()
        .then((res)=>{
          console.log('res-user',res.user)
        })
    }
    return (
        <div className='w-[100%]'>
            <div className="hero min-h-screen">
                    <div className="card bg-gray-600 md:w-[40%] w-[90%] mx-auto shrink-0 shadow-md shadow-slate-900">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h1 className='text-center text-2xl font-semibold text-white'>Register Now</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Name</span>
                                </label>
                                <input type="text" {...register("name")} placeholder="Full Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Email</span>
                                </label>
                                <input type="email" {...register("email")} placeholder="Enter Email" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-white">Password</span>
                                </label>
                                <input type="password" {...register("password")} placeholder="Enter Strong Password" className="input input-bordered" required />
                                {errors.password && <span>This field is required</span>}
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-primary">Register</button>
                            </div>
                        </form>
                        <div className='w-[90%] mx-auto '>
                            <button onClick={handelGoogle} className='btn w-[100%] mb-6'><FcGoogle className='text-xl'/>Register with Google</button>
                            <p className='my-4 text-center text-white'>Already have an Account <Link to='/login'><span className='cursor-pointer text-lg font-medium text-blue-500 hover:text-blue-300 ms-1'>Login</span></Link></p>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default Register;