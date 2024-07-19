import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faTachometerAlt, faTable, faAlignLeft, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../../services/apiService"; // Import fungsi logout dari apiservice
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Mendapatkan fungsi navigate

  const handleLogout = async () => {
    try {
      await logout(localStorage.getItem('csrfToken'));
      localStorage.removeItem('token');
      // Navigasi kembali ke halaman "/" setelah logout
      navigate("/");
      // Tampilkan pesan menggunakan toastr atau cara lainnya
      toastr.success("Logout berhasil");
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const handleItemClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="w-full items-center bg-white py-2 px-6 hidden sm:flex">
        <div className="w-1/2"></div>
        <div className="relative w-1/2 flex justify-end">
          <button onClick={() => setIsOpen(!isOpen)} className="relative z-10 w-12 h-12 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none">
            <img src="https://source.unsplash.com/uJ8LNVCBjFQ/400x400" alt="User Avatar" />
          </button>
          {isOpen && (
            <div className="absolute w-32 bg-white rounded-lg shadow-lg py-2 mt-16 right-0">
              <div onClick={() => setIsOpen(false)} className="fixed inset-0 cursor-default"></div>
              <Link to="/" onClick={handleItemClick} className="block px-4 py-2 account-link hover:text-black">Home</Link>
              <Link to="/dashboard-admin" onClick={handleItemClick} className="block px-4 py-2 account-link hover:text-black">Dashboard</Link>
              <Link to="/surats" onClick={handleItemClick} className="block px-4 py-2 account-link hover:text-black">Menu Al - Quran</Link>
              <Link to="" onClick={handleItemClick} className="block px-4 py-2 account-link hover:text-black">Menu Al - Quran Tematik</Link>
              <Link to="/hadiths" onClick={handleItemClick} className="block px-4 py-2 account-link hover:text-black">Menu Hadiths</Link>
              <Link to="/profile" onClick={handleItemClick} className="block px-4 py-2 account-link hover:text-black">Profile</Link>
              <Link to="#" onClick={() => { handleItemClick(); handleLogout(); }} className="block px-4 py-2 account-link hover:text-black">Sign Out</Link>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Header & Nav */}
      <header className="w-full bg-[#3d68ff] py-5 px-6 sm:hidden">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-white text-3xl font-semibold uppercase hover:text-gray-300" onClick={handleItemClick}>Admin</Link>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white text-3xl focus:outline-none">
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
          </button>
        </div>

        {/* Dropdown Nav */}
        {isOpen && (
          <nav className="flex flex-col pt-4">
            <Link to="/" className="flex items-center active-nav-link text-white py-2 pl-4 nav-item" onClick={handleItemClick}>
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
              Home
            </Link>
            <Link to="/dashboard-admin" className="flex items-center active-nav-link text-white py-2 pl-4 nav-item" onClick={handleItemClick}>
              <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
              Dashboard
            </Link>
            <Link to="/surats" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item" onClick={handleItemClick}>
              <FontAwesomeIcon icon={faTable} className="mr-3" />
              Menu Surat
            </Link>
            <Link to="/hadiths" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item" onClick={handleItemClick}>
              <FontAwesomeIcon icon={faAlignLeft} className="mr-3" />
              Menu Hadiths
            </Link>
            <Link to="/themes" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item" onClick={handleItemClick}>
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              Menu Al-Qur'an Tematik
            </Link>
            <Link to="/profile" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item" onClick={handleItemClick}>
              <FontAwesomeIcon icon={faUser} className="mr-3" />
              Profile
            </Link>
            <Link to="#" className="flex items-center text-white opacity-75 hover:opacity-100 py-2 pl-4 nav-item" onClick={() => { handleItemClick(); handleLogout(); }}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
              Sign Out
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}

export default Header;
