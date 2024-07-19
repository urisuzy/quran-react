import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import styles from './Back.module.css';
import { useNavigate } from 'react-router-dom';


const Back = ({ title, caption, cardColor, }) => {

    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1)
    }
    return (
        <div class="max-w-6xl mx-auto flex flex-row justify-center">
            <div className="info-kitab-title text-center items-center flex flex-row py-6 px-4">
                <button onClick={navigateBack} className='px-2 py-2'>
                    <FontAwesomeIcon icon={faChevronLeft} className='mr-8 mt-2' color='#000' size='4x' />
                </button>
                <div className={`${styles.infoKitabCard} text-center rounded px-4 py-4 mx-auto`} style={{ backgroundColor: cardColor }}>
                    <h1 className={`${styles.infoTitle} text-white font-bold `}>
                        {title}
                    </h1>
                    <p className={`${styles.infoCaption} text-white`}>
                        {caption}
                    </p>
                </div>
            </div>
        </div>
    );
};

Back.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
    backgroundColor: PropTypes.string,
  
};

export default Back;
