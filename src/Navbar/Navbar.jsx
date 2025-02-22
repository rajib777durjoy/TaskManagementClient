import React, { useState } from 'react';
import { MdLightMode, MdNightlight } from 'react-icons/md';
import useAuth from '../Hook/useAuth';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import useAxios from '../Hook/useAxios';
import Swal from 'sweetalert2';
import { CiMenuFries } from 'react-icons/ci';




const Navbar = () => {
    const [theme, setTheme] = useState('dark')
    const { user, logoutUser, setToggle } = useAuth()
    const axiosSecure = useAxios();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const navigateLogin = useNavigate()
    const handelLogout = () => {
        logoutUser()
            .then(() => {
                navigateLogin('/login')
            })
    }
    const handleModal = () => {
        document.getElementById('my_modal_5').showModal();

    }
    const onSubmit = (data) => {
        console.log(data)
        const taskInfo = {
            email: user?.email,
            title: data?.title,
            description: data?.description,
            category: data?.category,
            date: new Date()
        }
        console.log('taskinfo', taskInfo)
        axiosSecure.post('/taskpost', taskInfo)
            .then(res => {
                if (res.data?.insertedId) {
                    document.getElementById('my_modal_5').close();
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Your Task has been saved",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }

    return (
        <div>
            <div className={`navbar ${theme === 'light' ? 'bg-slate-200' : ' bg-gray-600'} `}>
                <div className='w-[90%] mx-auto'>
               
                    <div className="flex-1">
                        <a className=" text-slate-400 text-2xl font-semibold italic">Task<apan className='text-blue-500 '>Nexus</apan></a>
                    </div>
                    <div className=" gap-2 hidden md:flex">
                        {user ? <ul
                            tabIndex={0}
                            className="flex justify-between gap-4">
                            <li onClick={handleModal} className='bg-gray-800  text-slate-300 p-2 rounded-lg hover:bg-gray-500 '><a>Add Task</a></li>
                            <li onClick={handelLogout} className='bg-gray-800  text-slate-300 p-2 rounded-lg hover:bg-gray-500 '><a>Logout</a></li>
                        </ul> : <ul
                            tabIndex={0}
                            className="flex justify-between gap-4">
                            <NavLink to='/login'><li className='bg-gray-800  text-slate-300 p-2 rounded-lg hover:bg-gray-500 '><a>Login</a></li></NavLink>
                            <NavLink to='/register'><li className='bg-gray-800  text-slate-300 p-2 rounded-lg hover:bg-gray-500 '><a>Register</a></li></NavLink>
                        </ul>}

                    </div>
                    <details className="dropdown md:hidden block">
                        <summary className="btn m-1"><CiMenuFries /></summary>
                        <ul className="menu dropdown-content bg-base-100 rounded-box z-[1]  p-2 shadow">
                        {user ?<div>
                            <li onClick={handleModal} className='bg-gray-800  my-2 text-slate-300 p-2 rounded-lg hover:bg-gray-500 '><a>Add Task</a></li>
                            <li onClick={handelLogout} className='bg-gray-800 my-2  text-slate-300 p-2 rounded-lg hover:bg-gray-500 '><a>Logout</a></li>
                        </div> : <div>
                            <NavLink to='/login'><li className='bg-gray-800  text-slate-300 p-2 rounded-lg hover:bg-gray-500 '><a>Login</a></li></NavLink>
                            <NavLink to='/register'><li className='bg-gray-800  text-slate-300 p-2 rounded-lg hover:bg-gray-500 '><a>Register</a></li></NavLink>
                        </div>}
                        </ul>
                    </details>
                    <div className="ms-2">
                        <div className="">
                            <ul
                                tabIndex={0}
                                className="flex justify-between gap-2 pr-1">
                                <li className={`${theme === 'light' ? 'text-slate-500' : ''}`} onClick={() => setTheme('light')}><MdLightMode className='text-4xl' /></li>
                                <li className={`${theme === 'dark' ? 'text-slate-500' : ''}`} onClick={() => setTheme('dark')}><MdNightlight className='text-4xl' /></li>
                            </ul>
                        </div>
                    </div>
                    
                </div>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-slate-500">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className='w-[100%] mx-auto my-2'>
                            <input type='text' {...register("title")} maxLength={50} className="textarea textarea-bordered w-[100%]" placeholder="Title" />
                        </div>
                        <div className='w-[100%] mx-auto my-2'>

                            <textarea {...register("description")} maxLength={200} className="textarea textarea-bordered w-[100%]" placeholder="Description"></textarea>
                        </div>
                        <select {...register("category")} className="select select-bordered w-full ">
                            <option disabled selected>Select category</option>
                            <option value='To-Do'>To-Do</option>
                            <option value='In Progress'>In Progress</option>
                            <option value='Done'>Done</option>
                        </select>
                        <div className=' my-4'>
                            <button type='submit' className="btn btn-primary">Submit</button>
                        </div>

                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default Navbar;