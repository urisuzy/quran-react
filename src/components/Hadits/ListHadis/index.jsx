import React from "react";
import PropTypes from 'prop-types';
import saveLogo from '../../../assets/images/save-svg.png';
import copyLogo from '../../../assets/images/copy-svg.svg';
import styles from './ListHadis.module.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import { saveAyatHadith } from '../../../services/apiService'; // Perbarui impor agar menggunakan fungsi saveAyatHadith

const ListHadis = ({ hadis }) => {

    const copyButtonHandler = () => {
        const combinedText = `${hadis.arab} - ${hadis.indonesia}`;
        navigator.clipboard.writeText(combinedText)
            .then(() => {
                toastr.success('Teks Tercopy');
            })
            .catch(err => {
                console.error('Gagal menyalin: ', err);
            });
    };
    
    const saveButtonHandler = async () => {
        try {
            await saveAyatHadith(hadis.id); // Panggil fungsi penyimpanan ayat hadis dengan ID hadis
            toastr.success('Hadis successfully saved.'); // Tampilkan pesan sukses
        } catch (error) {
            console.error('Failed to save hadis: ', error); // Tampilkan pesan error jika terjadi kesalahan
            toastr.error('Failed to save hadis.');
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center">
                <div className={`${styles.listNumber} py-4 rounded-3xl border-black items-center`}>
                    <p className={`${styles.number} font-bold text-2xl`}>
                        {hadis.number}
                    </p>
                </div>
                <div className={`${styles.arabText} text-left px-4 py-4 rounded-xl bg-gray-100`}>
                    <p className="text-3xl text-right">{hadis.arab}</p>
                </div>
            </div>
            <div className="description mt-4">
                <small className="terjemahan-text text-justify">{hadis.indonesia}</small>
                <div className="flex flex-row gap-x-4 items-center function mt-4">
                    <button onClick={copyButtonHandler}>
                        <img src={copyLogo} alt="copy-button" />
                    </button>
                    <button onClick={saveButtonHandler}> {/* Tambahkan event onClick untuk panggil fungsi simpan */}
                        <img src={saveLogo} alt="save-button" />
                    </button>
                </div>
           
            </div>
            <div className="mt-4">
                <hr className="border-t border-black" />
            </div>
        </div>
    );
};

ListHadis.propTypes = {
    hadis: PropTypes.shape({
        id: PropTypes.number.isRequired,
        number: PropTypes.string.isRequired,
        arab: PropTypes.string.isRequired,
        indonesia: PropTypes.string.isRequired
    }).isRequired
};

export default ListHadis;
