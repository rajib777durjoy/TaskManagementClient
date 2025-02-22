
import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { auth } from '../firebase.config';
import useAxiosPublic from '../Hook/useAxiosPublic';
export const authcontext = createContext()


const Authcontext = ({children}) => {
    const [user,setuser]=useState([])
    const [loading,setloading]=useState(true)
    const axiosPublic= useAxiosPublic()
    const provider = new GoogleAuthProvider();
   const createUser=(email,password)=>{
    setloading(true)
    return createUserWithEmailAndPassword(auth,email,password)
   } 
   const loginUser=(email,password)=>{
    setloading(true)
    return signInWithEmailAndPassword(auth,email,password)
   }
   const logoutUser=()=>{
    return signOut(auth)
   }
   const google=()=>{
    setloading(true)
    return signInWithPopup(auth,provider)
   }
   useEffect(()=>{
    const unSubcribe = onAuthStateChanged(auth,(currentuser)=>{
        console.log('current-user',currentuser)
        setuser(currentuser)
        setloading(false)
        if(currentuser?.email){
            const userInfo={
                name:currentuser?.displayName,
                email:currentuser?.email,
            }
            axiosPublic.post('/user',userInfo)
            .then(res=>{
                console.log('data',res.data)
            })
          axiosPublic.post('/jwt',{email:currentuser?.email},{
            withCredentials:true
          })
        .then(respons=>{
            console.log('jwt',respons)
        })
        }
        else{
            axiosPublic('/logout',{})
        }
    });
    return ()=>{
        unSubcribe();
    }
   })
    const authInfo={
    createUser,
    loginUser,
    google,
    loading,
    user,
    logoutUser,
    
    }
    return (
        <div>
           <authcontext.Provider value={authInfo}>
            {children}
            </authcontext.Provider> 
        </div>
    );
};

export default Authcontext;