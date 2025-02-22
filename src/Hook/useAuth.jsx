import React, { useContext } from 'react';
import { authcontext } from '../AuthContext/Authcontext';

const useAuth = () => {
 const context= useContext(authcontext)
 return context
};

export default useAuth;