import React from "react";
import styles from "./TafsirModal.module.css"; // Ensure you have this CSS file to apply the styles

const TafsirModal = ({ isOpen, onClose, tafsir }) => {
  if (!isOpen) return null;

  return (
    <div className={`${styles.modalPopup} fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center`}>
      <div className="bg-white w-full h-full p-4 rounded shadow-lg relative mx-auto">
        <div className="absolute top-0 right-0 p-2">
          <button onClick={onClose}>
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
          <p dangerouslySetInnerHTML={{ __html: tafsir }} />
        </div>
      </div>
    </div>
  );
};

export default TafsirModal;
