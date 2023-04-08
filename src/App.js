import React, { useContext, useEffect, useState } from 'react';
import Navbar from "./components/Layout/NavBar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from './components/Homepage';
import axios from 'axios';
import Login from './components/Login';
import Logout from './components/Logout';
import ScrollToTop from './components/ScrollToTop';
import { ThemeContext } from './components/ThemeContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from './components/AuthContext';

const App = () => {
  const { dark } = useContext(ThemeContext);
  const { isAuthenticated , setError, error, setLoading } = useContext(AuthContext);

  useEffect(() => {
    if(error){
      toast.error(error)
    }
  }, [error])


  return (
    <>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          {isAuthenticated && <Route path='/' element={<Homepage key='home' />} />}
          <Route path='/login' element={<Login key='login' />} />
          <Route path='/logout' element={<Logout key='logout' />} />
          {/* <Route path='*' element={<Navigate to='/login' />} /> */}
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App