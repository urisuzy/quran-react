import React, { useState, useEffect } from 'react';
import { updateProfile, viewProfile } from '../../services/apiService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await viewProfile();
        setProfileData(profile);
        toastr.success('Profile data loaded successfully');
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        toastr.error('Failed to fetch profile data');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    if (storedName && storedEmail) {
      setProfileData(prevProfileData => ({
        ...prevProfileData,
        name: storedName,
        email: storedEmail
      }));
    }
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const csrfToken = localStorage.getItem('csrf_token');
      if (!csrfToken) {
        throw new Error('CSRF Token not found');
      }
      
      const response = await updateProfile(profileData, csrfToken);
      if (response.success) {
        toastr.success('Profile updated successfully');
        localStorage.setItem('name', profileData.name);

      } else {
        throw new Error(response.message || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      toastr.error(error.message || 'Failed to update profile');
    }
  };

  return (
    <>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-semibold mb-4">Profile</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
       
      
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={profileData.password}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
