import React from 'react';
import { Link } from 'react-router-dom'; // Impor Link dari React Router
import emptyLogo from '../../assets/images/empty.png';

const Error = () => {
    return (
        <div className="empty-page flex flex-col justify-center items-center text-center py-28 px-8">
            <img src={emptyLogo} alt="empty-img" className="text-center" />
            <p className="text-sky-400 mt-4 text-4xl font-medium">
                List Al-Quran Kosong
            </p>
            {/* Gunakan Link untuk membuat tombol yang mengarah kembali ke halaman awal */}
            <Link to="/" className="btn btn-kembali text-white items-center border-0 py-3 px-8 focus:outline-none rounded-2xl font-medium text-base mt-6 bg-blue-700 hover:bg-blue-500">
                Kembali ke Menu
            </Link>
        </div>
    );
};

export default Error;
