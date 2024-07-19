import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PropTypes from 'prop-types';
import styles from './NavbarDetail.module.css';
import logo from '../../../assets/images/logo.png';
import { useNavigate } from "react-router-dom";

const NavbarDetail = ({ navColor }) => {
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1);
    };

    const navigateHome = () => {
        navigate("/");
    };

    return (
        <div className={`${styles.backNav} text-center items-center flex flex-row py-2 px-6`} style={{ backgroundColor: navColor }}>
            <button className='px-2 py-2' onClick={navigateBack}>
                <FontAwesomeIcon icon={faChevronLeft} className='mt-2' color='#fff' size='2x' />
            </button>

            <div className="info-kitab-card text-center rounded px-4 py-4 mx-auto" onClick={navigateHome}>
                <img src={logo} className="w-16" alt="" srcSet="" />
            </div>
            <button className='px-2 py-2' onClick={navigateHome}>
                <FontAwesomeIcon icon={faChevronRight} className='mt-2' color='#fff' size='2x' />
            </button>
        </div>
    );
};

NavbarDetail.propTypes = {
    navColor: PropTypes.string
};

export default NavbarDetail;
