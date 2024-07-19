import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NavbarLogin.module.css';
import imgLogo from '../../../assets/images/logo.png';
import burgerLogo from '../../../assets/images/burger.svg';
import PropTypes from 'prop-types';
import { logout } from '../../../services/apiService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const NavbarLogin = ({ openLogin }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [userRole, setUserRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            setIsMenuOpen(window.innerWidth <= 768 ? false : true);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('role');
        if (token && email) {
            setUserName(email.split('@')[0]);
            setUserRole(role);
        }
    }, []);

    const handleLogout = async () => {
        try {
            const csrfToken = localStorage.getItem('csrf_token');
            if (!csrfToken) {
                throw new Error('CSRF token not found');
            }

            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User not authenticated');
            }

            await logout(csrfToken);

            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('role');

            // Display toastr notification
            toastr.success('Logout successful');

            navigate('/login');
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className={`${styles.sectionNavbar} border-box transition-all duration-500 linear lg:px-24 md:px-20 px-8 py-8`}>
            <div className="navbar-nav">
                <div className="container mx-auto flex flex-wrap flex-row items-center justify-between">
                    <a href="/" className="flex font-medium items-center">
                        <img src={imgLogo} className={styles.imgLogo} alt="img-logo" />
                    </a>
                    <label htmlFor={styles.menuToggle} className="cursor-pointer lg:hidden block" onClick={handleMenuToggle}>
                        <img src={burgerLogo} alt="" />
                    </label>
                    <input className="hidden" type="checkbox" id={styles.menuToggle} checked={isMenuOpen} onChange={handleMenuToggle} />
                    <div className={`lg:flex lg:items-center lg:w-auto w-full relative ${styles.dropdown}`} id="menu" style={{ display: isMenuOpen ? 'block' : 'none' }}>
                        {userName ? (
                            <div className="relative">
                                <button className={`${styles.btnLogin} text-white items-center border-0 py-3 px-8 focus:outline-none rounded-2xl font-medium text-base mt-6 lg:mt-0`} onClick={handleDropdownToggle} id="dropdown-toggle">
                                    {userName}
                                </button>
                                {isDropdownOpen && (
                                    <ul className={`absolute text-base font-medium bg-white border border-gray-200 rounded-xl py-2 mt-2 w-36 ${styles.dropdownMenu}`} id="dropdown-menu">
                                        <li><Link to="/" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Homepage</Link></li>
                                        <li><Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link></li>
                                        {userRole === 'admin' ? (
                                            <>
                                                <li><Link to="/dashboard-admin" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</Link></li>
                                                <li><Link to="/save-surat" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Simpan Ayat</Link></li>
                                                <li><Link to="/save-hadith" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Simpan Hadith</Link></li>
                                              
                                                <li><Link to="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Register</Link></li>
                                                <li><Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</Link></li>
                                            </>
                                            
                                        ) : (
                                            <>
                                                <li><Link to="/save-surat" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Simpan Ayat</Link></li>
                                                <li><Link to="/save-hadith" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Simpan Hadith</Link></li>
                                               
                                                <li><Link to="/register" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Register</Link></li>
                                                <li><Link to="/login" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Login</Link></li>
                                            </>
                                        )}
                                        <li><Link to="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleLogout}>Logout</Link></li>
                                    </ul>
                                )}
                            </div>
                        ) : (
                            <button onClick={openLogin} className={`${styles.btnLogin} text-white items-center border-0 py-3 px-8 focus:outline-none rounded-2xl font-medium text-base mt-6 lg:mt-0`}>
                                Login
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

NavbarLogin.propTypes = {
    openLogin: PropTypes.func.isRequired
};

export default NavbarLogin;
