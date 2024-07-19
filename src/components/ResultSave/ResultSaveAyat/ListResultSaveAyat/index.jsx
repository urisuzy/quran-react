// ListResultSaveAyat.js
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import removeLogo from '../../../../assets/images/remove-svg.svg';
import audioLogo from '../../../../assets/images/play-svg.svg';
import pauseLogo from '../../../../assets/images/play-pause.svg';
import copyLogo from '../../../../assets/images/copy-svg.svg';
import tafsirLogo from '../../../../assets/images/note-svg.svg';
import { deleteSavedAyatSurat } from '../../../../services/apiService';
import styles from './AyatList.module.css';

const ListResultSaveAyat = ({
  listNumber,
  ayat,
  latinText,
  englishText,
  terjemahanText,
  audio,
  tafsir,
  ayatId,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const audioElement = new Audio(audio);
    const handleAudioEnd = () => {
      setIsPlaying(false);
      toastr.success('Audio telah selesai');
    };

    audioElement.addEventListener('ended', handleAudioEnd);

    return () => {
      audioElement.removeEventListener('ended', handleAudioEnd);
    };
  }, [audio]);

  const toggleAudio = () => {
    const audioElement = new Audio(audio);
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
      toastr.success('Audio dihentikan');
    } else {
      audioElement.play();
      setIsPlaying(true);
      toastr.success('Audio dimulai');
    }
  };

  const copyButtonHandler = () => {
    const combinedText = `${ayat} - ${terjemahanText}`;
    navigator.clipboard
      .writeText(combinedText)
      .then(() => {
        toastr.success('Teks Tercopy');
      })
      .catch((err) => {
        console.error('gagal to copy: ', err);
      });
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const removeAyatHandler = async () => {
    try {
      await deleteSavedAyatSurat(ayatId);
      setIsVisible(false);
      toastr.success('Ayat telah dihapus');
    } catch (error) {
      console.error('Gagal menghapus ayat:', error);
      toastr.error('Gagal menghapus ayat');
    }
  };

  const formattedTafsir = tafsir.replace(/\n/g, '<br />');

  return (
    <div className={`flex flex-col ${isVisible ? '' : 'hidden'}`}>
      <div className="flex flex-row justify-between items-center">
        <div
          className={`${styles.listNumber} py-4 rounded-3xl border-black items-center`}
        >
          <p className={`${styles.number} font-bold text-2xl`}>
            {listNumber}
          </p>
        </div>
        <div
          className={`${styles.arabText} text-left px-4 py-4 rounded-xl bg-gray-100`}
        >
          <p className="text-4xl text-right">{ayat}</p>
        </div>
      </div>
      <div className="description mt-4">
        {latinText && (
          <p className="latin-text text-blue-800">{latinText}</p>
        )}
        {terjemahanText && <p className="terjemahan-text">{terjemahanText}</p>}
        {englishText && (
          <p className="english-text text-green-600">{englishText}</p>
        )}
        <div className="flex flex-row gap-x-4 items-center function mt-4">
          <button onClick={removeAyatHandler}>
            <img src={removeLogo} alt="remove-button" />
          </button>
          <button onClick={toggleAudio}>
            <img src={isPlaying ? pauseLogo : audioLogo} alt="audio-button" />
          </button>
          <button onClick={copyButtonHandler}>
            <img src={copyLogo} alt="copy-button" />
          </button>
          <button onClick={openModal}>
            <img src={tafsirLogo} alt="tafsir-button" />
          </button>
        </div>
      </div>
      <div className="mt-4">
        <hr className="border-t border-black" />
      </div>

      {isModalOpen && (
        <div
          className={`${styles.modalPopup} fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50`}
        >
          <div className="bg-white w-full p-4 rounded shadow-lg">
            <div className="absolute top-0 right-0 p-2">
              <button onClick={closeModal}>
                <svg
                  className="w-6 h-6 text-gray-600 hover:text-gray-800"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">Tafsir</h2>
              <p dangerouslySetInnerHTML={{ __html: formattedTafsir }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

ListResultSaveAyat.propTypes = {
  listNumber: PropTypes.number.isRequired,
  ayat: PropTypes.string.isRequired,
  latinText: PropTypes.string,
  englishText: PropTypes.string,
  terjemahanText: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  tafsir: PropTypes.string.isRequired,
  ayatId: PropTypes.number.isRequired,
};

export default ListResultSaveAyat;
