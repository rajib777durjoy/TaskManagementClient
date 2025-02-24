

import useAxios from "../../Hook/useAxios";
import useAuth from "../../Hook/useAuth";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";



const Home = () => {
    const axiosSecure = useAxios()
    const {user} = useAuth()
    const [tasks, setTasks] = useState([]);
    const [dragTask, setDragTask] = useState(null);
    const [editId, setEditId] = useState(null)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    // useEffect(() => {
    //     if (user?.email) {
    //         const data = {
    //             email: user?.email
    //         }
    //         axiosSecure.get(`/alltask/${user?.email}`)
    //             .then(res => {
    //                 console.log(res.data)
    //                 setTasks(res.data)
    //             })
    //     }

    // }, [user?.email])
    const { data: AllData = [], refetch } = useQuery({
        queryKey: ['task',user?.email],
        queryFn: async () => {
            if(user?.email){
            const res = await axiosSecure.get(`/alltask/${user?.email}`)
            console.log(res.data)
            return res.data;
            }
        }
    })



    const handleDrag = (e, task) => {
        setDragTask(task)
    }
    const handleDragAndDrop = (value) => {
        // console.log('value', value)
        // console.log('drag', dragTask)
        const CategoryData = {
            value,
            categoryId: dragTask?._id
        }

        axiosSecure.put('/categoryUpdate', CategoryData)
            .then(res => {
                // console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch()
                }
            })
    }
    const handleOnDrop = (e) => {
        // console.log(e.target.getAttribute('data-status'))
        let status = e.target.getAttribute('data-status');
        if (status === 'To-Do') {
            handleDragAndDrop(status)
        } else if (status === 'In Progress') {
            handleDragAndDrop(status)
        }
        else if (status === 'Done') {
            handleDragAndDrop(status)
        }
    }
    const onDragover = (e) => {
        e.preventDefault()
    }
    const handleChange = (id) => {
        setEditId(id)
        document.getElementById('my_modal_1').showModal()

    }

    const onSubmit = (data) => {
        // console.log('data', data.task)
        axiosSecure.put(`/taskEdit/${editId}`, { title: data.task })
            .then(res => {
                console.log('edit', res.data)
                if (res.data.modifiedCount > 0) {
                    document.getElementById('my_modal_1').close()
                    Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "Task Update Successful",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch()
                }
            })

    }

    const handleDelete = (id) => {
         axiosSecure.delete(`/taskDelete/${id}`)
         .then(res=>{
            console.log('delete',res.data)
            if(res.data.deletedCount > 0){
                Swal.fire({
                    position:"top-center",
                    icon: "success",
                    title: "Task Delete Successful",
                    showConfirmButton: false,
                    timer: 1500
                  });
                refetch()
            }
        })
    }

    // console.log('stateid', editId)
    return (
        <div className='w-[100%] min-h-screen border border-t-0 border-b-0'>
            <div className="md:w-[90%] w-[80%] mx-auto grid md:grid-cols-3 gap-4 mt-2 ">
                <div
                    data-status='To-Do'
                    onDrop={handleOnDrop}
                    onDragOver={onDragover}
                    className=" min-h-[100px] bg-gray-500 px-4 rounded-md"
                >
                    <h1 className="text-white text-xl font-bold text-center">ToDo</h1>
                    {
                        AllData?.length > 0 && AllData?.map((task) => (
                            task?.category === 'To-Do' && <div key={task._id} draggable onDrag={(e) => handleDrag(e, task)} className="text-white bg-slate-400 rounded-md p-2 my-2 flex justify-between items-center">
                                {task.title}
                                <div className="flex">
                                 <li onClick={() => handleChange(task?._id)} className="list-none ms-2"><MdModeEdit className="text-2xl" /></li>
                                 <li onClick={() => handleDelete(task?._id)} className="list-none mx-2"><MdDelete className="text-2xl" /></li>
                                 </div>
                                
                            </div>
                        ))
                    }
                </div>
                <div data-status='In Progress'
                    onDrop={handleOnDrop}
                    onDragOver={onDragover}
                    className=" min-h-[100px] bg-gray-500 px-4 rounded-md"
                >
                    <h1 className="text-white text-xl font-bold text-center">In Progress</h1>
                    {
                        AllData?.length > 0 && AllData?.map((task) => (
                            task?.category === 'In Progress' && <div key={task._id} draggable onDrag={(e) => handleDrag(e, task)} className="text-white bg-slate-400 rounded-md p-2 my-2 flex justify-between items-center">
                                {task.title}
                                
                                <div className="flex">
                                 <li onClick={() => handleChange(task?._id)} className="list-none ms-2"><MdModeEdit className="text-2xl" /></li>
                                 <li onClick={() => handleDelete(task?._id)} className="list-none mx-2"><MdDelete className="text-2xl" /></li>
                                 </div>
                               
                            </div>
                        ))
                    }
                </div>
                <div
                    data-status='Done'
                    onDrop={handleOnDrop}
                    onDragOver={onDragover}
                    className=" min-h-[100px] bg-gray-500 px-4 rounded-md"
                >
                    <h1 className="text-white text-xl font-bold text-center">Done</h1>
                    {
                        AllData?.length > 0 && AllData?.map((task) => (
                            task?.category === 'Done' && <div key={task._id} draggable onDrag={(e) => handleDrag(e, task)} className="text-white bg-slate-400 rounded-md p-2 my-2 flex justify-between items-center">
                                {task.title}
                                 <div className="flex">
                                 <li onClick={() => handleChange(task?._id)} className="list-none ms-2"><MdModeEdit className="text-2xl" /></li>
                                 <li onClick={() => handleDelete(task?._id)} className="list-none mx-2"><MdDelete className="text-2xl" /></li>
                                 </div>
                               
                            </div>
                        ))
                    }
                </div>
            </div>
            {/* Open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" onClick={()=>document.getElementById('my_modal_2').showModal()}>open modal</button> */}


            <dialog id="my_modal_1" className="modal">
                <form onSubmit={handleSubmit(onSubmit)} className="modal-box">
                    <h3 className="font-bold text-lg">Update Your Task</h3>
                    <input {...register("task")} type="text" placeholder="Update your task" className="input input-bordered w-full max-w-xs" />
                    <div className="modal-action">
                        {/* if there is a button in form, it will close the modal */}
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>
            </dialog>
        </div>
    );
};

export default Home;