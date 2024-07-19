import { useState } from 'react';

// Custom hook for managing authentication state
const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    // Function to simulate login
    const login = (username) => {
        setIsLoggedIn(true);
        setUserName(username);
    };

    // Function to simulate logout
    const logout = () => {
        setIsLoggedIn(false);
        setUserName('');
    };

    return { isLoggedIn, userName, login, logout };
};

export default useAuth;
