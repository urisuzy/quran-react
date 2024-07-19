import React from 'react';
import PropTypes from 'prop-types';
import SuratList from '../SuratList';
import Empty from '../../Error'; 

const GridListSurat = ({ dataSurah }) => {
    return (
        <section className="content-kitab-card max-w-6xl mx-auto flex flex-row justify-center mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-4 gap-y-4 overflow-hidden">
                {dataSurah.length > 0 ? (
                    dataSurah.map((data, index) => (
                        <SuratList
                            key={data.id}
                            surah={data.nama_latin}
                            translate={data.arti}
                            surahEnglish={data.nama_inggris}
                            englishTranslate={data.arti_inggris}
                            description={data.deskripsi}
                            fromSurah={data.tempat_turun}
                            totalAyat={data.jumlah_ayat}
                            listNumber={data.nomor}
                            surahId={data.slug}
                            audioSurah={data.audio_satu}
                        />
                    ))
                ) : (
                    <Empty /> 
                )}
            </div>
        </section>
    );
};

GridListSurat.propTypes = {
    dataSurah: PropTypes.array.isRequired,
    originalDataSurah: PropTypes.array.isRequired,
};

export default GridListSurat;
