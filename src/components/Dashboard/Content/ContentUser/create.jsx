import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeUser } from '../../../../services/apiService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const CreateContentUser = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        role: '', // Menambahkan role di sini
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await storeUser(userData);
            toastr.success(response.message);
            navigate('/users');
        } catch (error) {
            if (error === 'Email is already registered.') {
                toastr.error('Email is already registered. Please use a different email.');
            } else {
                toastr.error('Failed to register user.');
            }
        }
    };

    return (
        <div className="w-full h-screen overflow-x-hidden border-t">
            <main className="w-full p-6">
                <h1 className="w-full text-3xl text-black pb-6">Forms User</h1>
                <div className="flex flex-wrap">
                    <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
                        <div className="leading-loose">
                            <form onSubmit={handleSubmit} className="p-10 bg-white rounded shadow-xl">
                                <div className="">
                                    <label className="block text-sm text-gray-600" htmlFor="name">Name</label>
                                    <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="name" name="name" type="text" required value={userData.name} onChange={handleChange} placeholder="Your Name" aria-label="Name" />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-gray-600" htmlFor="email">Email</label>
                                    <input className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded" id="email" name="email" type="text" required value={userData.email} onChange={handleChange} placeholder="Your Email" aria-label="Email" />
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-gray-600" htmlFor="role">Role</label>
                                    <select name="role" id="role" className='w-full px-5 py-4 text-gray-700 bg-gray-200 rounded' value={userData.role} onChange={handleChange}>
                                        <option value="">Select Role</option> {/* Tambahkan opsi kosong */}
                                        <option value="admin">Admin</option>
                                        <option value="member">Member</option>
                                    </select>
                                </div>
                                <div className="mt-2">
                                    <label className="block text-sm text-gray-600" htmlFor="password">Password</label>
                                    <input className="w-full px-5 py-4 text-gray-700 bg-gray-200 rounded" id="password" name="password" type="password" required value={userData.password} onChange={handleChange} placeholder="Your Password" aria-label="password" />
                                </div>
                                <div className="mt-6">
                                    <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateContentUser;
