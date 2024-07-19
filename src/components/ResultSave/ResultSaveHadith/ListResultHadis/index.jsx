// ListResultHadis.js
import React, { useState } from "react";
import PropTypes from 'prop-types';
import removeLogo from '../../../../assets/images/remove-svg.svg';
import copyLogo from '../../../../assets/images/copy-svg.svg';
import styles from './ListHadis.module.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { deleteSavedAyatHadith } from '../../../../services/apiService';

const ListResultHadis = ({ hadis, onUpdate }) => {
    const [isVisible, setIsVisible] = useState(true);

    const copyButtonHandler = () => {
        const combinedText = `${hadis.ayat_hadith.arab} - ${hadis.ayat_hadith.indonesia}`;
        navigator.clipboard.writeText(combinedText)
            .then(() => {
                toastr.success('Text copied');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            });
    };

    const removeButtonHandler = async () => {
        try {
            await deleteSavedAyatHadith(hadis.id);
            setIsVisible(false);
            toastr.success('Hadith removed successfully');
            onUpdate();
        } catch (error) {
            console.error('Failed to remove hadith:', error);
       
        }
    };

    return (
        <div className={`flex flex-col ${isVisible ? '' : 'hidden'}`}>
            <div className="flex flex-row justify-between items-center">
                <div className={`${styles.listNumber} py-4 rounded-3xl border-black items-center`}>
                    <p className={`${styles.number} font-bold text-2xl`}>
                        {hadis.ayat_hadith.number}
                    </p>
                </div>
                <div className={`${styles.arabText} text-left px-4 py-4 rounded-xl bg-gray-100`}>
                    <p className="text-3xl text-right">{hadis.ayat_hadith.arab}</p>
                </div>
            </div>
            <div className="description mt-4">
                <small className="terjemahan-text text-justify">{hadis.ayat_hadith.indonesia}</small>
                <div className="flex flex-row gap-x-4 items-center function mt-4">
                    <button onClick={removeButtonHandler}>
                        <img src={removeLogo} alt="remove-button" />
                    </button>
                    <button onClick={copyButtonHandler}>
                        <img src={copyLogo} alt="copy-button" />
                    </button>
                </div>
            </div>
            <div className="mt-4">
                <hr className="border-t border-black" />
            </div>
        </div>
    );
};

ListResultHadis.propTypes = {
    hadis: PropTypes.shape({
        id: PropTypes.number.isRequired,
        ayat_hadith: PropTypes.shape({
            id: PropTypes.number.isRequired,
            number: PropTypes.string.isRequired,
            arab: PropTypes.string.isRequired,
            indonesia: PropTypes.string.isRequired
        }).isRequired
    }).isRequired,
    onUpdate: PropTypes.func.isRequired
};

export default ListResultHadis;
