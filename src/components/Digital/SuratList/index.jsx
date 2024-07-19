import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import styles from './SuratList.module.css';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const SuratList = ({ 
    listNumber,
    surah,
    surahEnglish,
    translate,
    englishTranslate,
    description,
    fromSurah,
    totalAyat,
    surahId,
    audioSurah
}) => {

    const [isPlaying, setIsPlaying] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const audioRef = useRef(new Audio(audioSurah));

    const handleSurahClick = () => {
        navigate(`/surats/${surahId}`);
    }

    useEffect(() => {
        const audioElement = audioRef.current;
        const handleAudioEnd = () => {
            setIsPlaying(false);
        };

        audioElement.addEventListener('ended', handleAudioEnd);

        return () => {
            audioElement.removeEventListener('ended', handleAudioEnd);
        };
    }, []);

    const toggleAudio = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }

        setIsPlaying(!isPlaying);
    };

    const stopAudio = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
    };

    const handleInfoClick = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={`${styles.cardKitab} rounded overflow-hidden px-8 py-8`}>

            <div className="flex flex-row items-center">
                <div className={`${styles.listNumber} py-4 rounded-3xl border-black items-center`}>
                    <p className={`${styles.listTitle} font-bold text-2xl`}>
                        {listNumber}
                    </p>
                </div>
                <div className="px-4 py-4 items-center">

                    <h6 className={`${styles.contentTitle} font-bold text-base text-black`}>
                        {surah} <br />
                        {surahEnglish} <br/>
                        <span className={styles.terjemahanText}>
                            ({translate}) <br/> 
                            ({englishTranslate})
                        </span>

                        <div className={`${styles.captionText} d-inline-block`}>
                            {fromSurah} ({totalAyat} Ayat)
                        </div>
                    </h6>
                    <FontAwesomeIcon icon={faInfoCircle} onClick={handleInfoClick} />
                </div>
            </div>

            <div className="px-4">
                <hr className="border-t border-black" />
            </div>

            <div className="masuk-btn py-4 px-4">
                <button onClick={handleSurahClick} className={`${styles.btnBuka} w-full px-2 py-2`}>
                    Baca Surah
                </button>

                <button onClick={isPlaying ? stopAudio : toggleAudio} className={`${styles.btnBuka} w-full px-2 py-2 mt-2`}>
                    {isPlaying ? 'Selesai' : 'Lantunan Ayat'}
                </button>

                {/* Modal */}
                {showModal && (
                    <div className={`${styles.modal} ${styles.modalVisible}`}>
                        <div className={`${styles.modalContent}`}>
                            <span className={`${styles.close}`} onClick={closeModal}>&times;</span>
                            <div className='text-justify' dangerouslySetInnerHTML={{ __html: description }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

SuratList.propTypes = {
    listNumber: PropTypes.number,
    surah: PropTypes.string,
    translate: PropTypes.string,
    englishTranslate: PropTypes.string,
    description: PropTypes.string,
    fromSurah: PropTypes.string,
    totalAyat: PropTypes.number,
    surahId: PropTypes.string,
    audioSurah: PropTypes.string 
}

export default SuratList;
