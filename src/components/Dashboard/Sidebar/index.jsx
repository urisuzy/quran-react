import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTachometerAlt, faTable, faList, faLayerGroup, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../../services/apiService";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(localStorage.getItem('csrfToken'));
      localStorage.removeItem('token');
      // Navigasi ke halaman login setelah logout berhasil
      navigate('/login');
      // Tampilkan pesan alert menggunakan Toastr setelah logout berhasil
      toastr.success('Logout berhasil');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <aside className="relative bg-[#3d68ff] h-screen w-64 hidden sm:block shadow-xl">
      <div className="p-6">
        <Link to="/" className="text-white text-3xl font-semibold uppercase hover:text-gray-300">Admin</Link>
      </div>
      <nav className="text-white text-base font-semibold pt-3">
        <Link to="/" className="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
          <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
          Kembali ke Landing Page
        </Link>
        <Link to="/dashboard-admin" className="flex items-center active-nav-link text-white py-4 pl-6 nav-item">
          <FontAwesomeIcon icon={faTachometerAlt} className="mr-3" />
          Dashboard
        </Link>
        <Link to="/themes" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
          <FontAwesomeIcon icon={faTable} className="mr-3" />
          Tema
        </Link>
        <Link to="/subthemes" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
          <FontAwesomeIcon icon={faList} className="mr-3" />
          Sub Tema
        </Link>
        <Link to="/subsubthemes" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
          <FontAwesomeIcon icon={faLayerGroup} className="mr-3" />
          Sub Sub Tema
        </Link>
        <Link to="/contentthemes" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
          <FontAwesomeIcon icon={faUser} className="mr-3" />
          Content Tema
        </Link>
        <Link to="/users" className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
          <FontAwesomeIcon icon={faUser} className="mr-3" />
          User
        </Link>
        <button onClick={handleLogout} className="flex items-center text-white opacity-75 hover:opacity-100 py-4 pl-6 nav-item">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-3" />
          Sign Out
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
