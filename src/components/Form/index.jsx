// Form.jsx
import React, { useState, useEffect } from 'react';
import styles from './Form.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { register, login, getCsrfToken } from '../../services/apiService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const Form = ({ isRegister }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const token = await getCsrfToken();
        setCsrfToken(token);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(password)) {
      toastr.error('Password must contain at least 8 characters with at least one uppercase letter, one number, and one special character.');
      return;
    }

    try {
      await register({ name, email, password, c_password: confirmPassword, role: 'member' }, csrfToken);
      // Handle successful registration
      toastr.success('Registration successful!');
      navigate('/login'); // Redirect to login page
    } catch (error) {
      // Handle registration error
      if (error.message === 'Email is already registered.') {
        toastr.error('Registration failed: Email is already registered.');
      } else {
        toastr.error('Registration failed. Please try again.');
        console.error('Registration failed:', error);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await login({ email, password });
      const { token, name, role, id } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('email', email);
      localStorage.setItem('name', name);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', id); // Set user ID in localStorage
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('token', token); 
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('userId', id); // Also set user ID in sessionStorage
      // Handle successful login
      toastr.success('Login successful!');
      navigate('/');
    } catch (error) {
      // Handle login error
      toastr.error('Login failed. Please try again.');
      console.error('Login failed:', error);
    }
  };
  

  return (
    <div className="content-form flex items-center justify-center mb-6">
      <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full">
        <form onSubmit={isRegister ? handleRegister : handleLogin} method='post'>
          {isRegister && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2">Full Name <span className="text-red-600">*</span></label>
              <input type="text" id="name" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required value={name} onChange={handleNameChange} />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address <span className="text-red-600">*</span></label>
            <input type="email" id="email" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="admin@gmail.com" value={email} onChange={handleEmailChange} />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password <span className="text-red-600">*</span></label>
            <input type="password" id="password" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="••••••••" value={password} onChange={handlePasswordChange} />
          </div>
          {isRegister && (
            <div className="mb-6">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password <span className="text-red-600">*</span></label>
              <input type="password" id="confirmPassword" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="••••••••" value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </div>
          )}
          <button type="submit" className={`${styles.btnLogin} w-full px-4 py-4 font-bold`}>{isRegister ? ' Register' : ' Login'}</button>
          <p className="text-gray-600 text-xs text-center mt-4">
            {isRegister ? 'Already have an account?' : 'Don\'t have an account?'}
            <Link to={isRegister ? '/login' : '/register'} className="text-black hover:underline">{isRegister ? ' Login' : ' Register'}</Link>.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Form;
