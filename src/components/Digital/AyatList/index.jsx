// AyatList.jsx

import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import audioLogo from '../../../assets/images/play-svg.svg';
import pauseLogo from '../../../assets/images/play-pause.svg';
import copyLogo from '../../../assets/images/copy-svg.svg';
import tafsirLogo from '../../../assets/images/note-svg.svg';
import saveLogo from '../../../assets/images/save-svg.svg';
import styles from './AyatList.module.css';
import { saveAyatSurat } from '../../../services/apiService'; // Import fungsi saveAyatSurat

const AyatList = ({
  listNumber,
  ayat,
  latinText,
  englishText,
  terjemahanText,
  audio,
  tafsir,
  ayatId, // Menambahkan properti ayatId
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const audioRef = useRef(new Audio(audio));

  useEffect(() => {
    const audioElement = audioRef.current;
    const handleAudioEnd = () => {
      setIsPlaying(false);
      toastr.success('Audio telah selesai');
    };

    audioElement.addEventListener('ended', handleAudioEnd);

    return () => {
      audioElement.removeEventListener('ended', handleAudioEnd);
    };
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      toastr.success('Audio dihentikan');
    } else {
      audioRef.current.play();
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

  const formattedTafsir = tafsir.replace(/\n/g, '<br />');

  const saveAyat = async () => {
    try {
      await saveAyatSurat(ayatId); // Panggil fungsi saveAyatSurat dengan ayatId sebagai parameter
      toastr.success('Ayat berhasil disimpan');
    } catch (error) {
      console.error('Gagal menyimpan ayat:', error);
      toastr.error('Gagal menyimpan ayat, dikarenakan sudah disimpan');
    }
  };

  return (
    <div className="flex flex-col">
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
          <button onClick={toggleAudio}>
            <img src={isPlaying ? pauseLogo : audioLogo} alt="audio-button" />
          </button>
          <button onClick={copyButtonHandler}>
            <img src={copyLogo} alt="copy-button" />
          </button>
          <button onClick={openModal}>
            <img src={tafsirLogo} alt="tafsir-button" />
          </button>
          <button onClick={saveAyat}> {/* Tambahkan onClick event untuk memanggil saveAyat */}
            <img src={saveLogo} alt="save-button" />
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

AyatList.propTypes = {
  listNumber: PropTypes.number.isRequired,
  ayat: PropTypes.string.isRequired,
  latinText: PropTypes.string,
  englishText: PropTypes.string,
  terjemahanText: PropTypes.string.isRequired,
  audio: PropTypes.string.isRequired,
  tafsir: PropTypes.string.isRequired,
  ayatId: PropTypes.number.isRequired, // Tambahkan properti ayatId sebagai PropTypes
};

export default AyatList;
