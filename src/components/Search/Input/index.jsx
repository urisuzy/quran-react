// InputSurah.js
import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputSurah.module.css';

const Input = ({ onSearch, placeholderText }) => {
    const handleInputChange = (event) => {
        const query = event.target.value;
        onSearch(query);
    };

    return (
        <div className="max-w-sm mx-auto flex flex-col justify-center">
            <div className="mb-4 mt-4">
                <input
                    id="search"
                    className={`${styles.formInput} w-full px-4 py-2  border rounded-lg text-gray-700 focus:ring-blue-500`}
                    placeholder={placeholderText}
                    onChange={handleInputChange} 
                />
            </div>
        </div>
    );
};

Input.propTypes = {
    onSearch: PropTypes.func.isRequired,
    placeholderText: PropTypes.string
};

export default Input;
