// GridResultSaveAyat.js
import PropTypes from 'prop-types';
import AyatList from '../ListResultSaveAyat';
import Empty from '../../../Error';

const GridResultSaveAyat = ({ ayatData }) => {
    return (
        <div className="detail-kitab justify-center px-2">
            <div className="detail-card max-w-6xl mx-auto flex flex-row mt-8">
                <div className="grid grid-cols-1 gap-y-4 w-full">
                    {ayatData && ayatData.data && ayatData.data.map((data) => (
                        <AyatList
                            key={data.id}
                            ayatId={data.id}
                            listNumber={data.ayat_surat.nomor_ayat}
                            ayat={data.ayat_surat.teks_arab}
                            latinText={data.ayat_surat.teks_latin}
                            englishText={data.ayat_surat.teks_inggris}
                            terjemahanText={data.ayat_surat.teks_indonesia}
                            audio={data.ayat_surat.audio_dua}
                            tafsir={data.ayat_surat.tafsir}
                        />
                    ))}
                    {ayatData && ayatData.data && ayatData.data.length === 0 && (
                        <Empty key="empty-ayat" />
                    )}
                </div>
            </div>
        </div>
    );
};

GridResultSaveAyat.propTypes = {
    ayatData: PropTypes.array.isRequired 
};

export default GridResultSaveAyat;
