// ListPerawi.js
import React from "react";
import PropTypes from 'prop-types';
import styles from './ListPerawi.module.css';
import { useNavigate } from 'react-router-dom';

const ListPerawi = ({ namePerawi, totalHadis, slug }) => {
    const navigate = useNavigate();

    const handleHadisClick = () => {
        navigate(`/hadiths/${slug}`);
    }

    return (
        <div className={`${styles.cardKitab} rounded overflow-hidden px-8 py-8`}>

            <div className="flex flex-row items-center">
                <div className="px-4 py-4 items-center">
                    <h6 className={`${styles.contentTitle} font-bold text-base text-black`}>
                        {namePerawi}
                        <div className={`${styles.captionText} d-inline-block`}>
                            ({totalHadis} Riwayat)
                        </div>
                    </h6>
                </div>
            </div>

            <div className="px-4">
                <hr className="border-t border-black" />
            </div>

            <div className="masuk-btn py-4 px-4">
                <button onClick={handleHadisClick} className={`${styles.btnBuka} w-full px-2 py-2`}>
                    Lihat Hadis
                </button>
            </div>
        </div>
    );
}

ListPerawi.propTypes = {
    namePerawi: PropTypes.string,
    totalHadis: PropTypes.string, // Ensure this is a string
    slug: PropTypes.string
}

export default ListPerawi;
