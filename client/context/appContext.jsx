import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'

const context = createContext(null);

const AppContextProvider = ({ children }) => {
    const PORT = 'http://localhost:3000/api';

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [books, setBooks] = useState([]);
    const [refresh, setRefresh] = useState(0);

    async function fetchData() {
        const res = await axios.get(`${PORT}/books`, {
            headers: { Authorization: token }
        });
        if (res.status === 200) {
            setBooks(res.data);
            console.log("Books fetched successfully", res.data);

        } else {
            console.error("failed to fetch books", res.data);
        }
    }

    useEffect(() => {
        if (token) {
            fetchData();
        }
    }, [token, refresh]);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (!user || !token) return;

        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', `Bearer ${token}`);
    }, [user, token]);

    function refreshData() {
        console.log("refreshing...");
        setRefresh(prev => prev + 1);
    }

    const val = { user, setUser, token, setToken, PORT, books, setBooks, refreshData, refresh };
    return (
        <context.Provider value={val}>{children}</context.Provider>
    )
}

const useAppContext = () => {
    return useContext(context);
}

export { useAppContext, AppContextProvider };