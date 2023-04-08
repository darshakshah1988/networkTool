import React, { createContext, useEffect, useState } from 'react';
import { getCurrentUser } from '../service';

const defaultProvider = {
    user: {},
    setUser: () => null,
    isAuthenticated: false,
    setIsAuthenticated: () => null,
    loading: false,
    setLoading: () => null,
    error:'',
    setError:() => null
}

const AuthContext = createContext(defaultProvider);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getLoggedInDetails = async () => {
        const response = await getCurrentUser();
        if (response?.data?.success) {
            setIsAuthenticated(true);
            setUser(response.data.user);
            setError('');
        } 
    }

    useEffect(() => {
        setLoading(true);
        getLoggedInDetails();
        setLoading(false);
    }, [])



    const values = {
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        loading,
        setLoading,
        error,
        setError
    }
    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }