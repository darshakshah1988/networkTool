import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../API_URL'
import { AuthContext } from './AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { setIsAuthenticated } = React.useContext(AuthContext);
    const logout = async()=>{
        await axios.get(`${API_URL}/logout`);
        setIsAuthenticated(false);
        toast.success('Logged Out!!');
        navigate('/')
    }
    useEffect(() => {
        logout();
    }, [])
    
  return (
    <></>
  )
}

export default Logout