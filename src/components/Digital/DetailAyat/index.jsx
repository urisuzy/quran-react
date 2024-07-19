import PropTypes from 'prop-types';
import AyatList from '../AyatList';
import Empty from '../../Error';

const DetailAyat = ({ ayatData }) => {
    return (
        <div className="detail-kitab justify-center px-2">
            <div className="detail-card max-w-6xl mx-auto flex flex-row mt-8">
                <div className="grid grid-cols-1 gap-y-4 w-full">
                    {ayatData && ayatData.map((data) => (
                        <AyatList
                            key={data.id}
                            ayatId={data.id} // Menambahkan properti id yang diteruskan ke AyatList
                            listNumber={data.nomor_ayat}
                            ayat={data.teks_arab}
                            latinText={data.teks_latin}
                            englishText={data.teks_inggris}
                            terjemahanText={data.teks_indonesia}
                            audio={data.audio_satu}
                            tafsir={data.tafsir}
                        />
                    ))}
                    {ayatData.length === 0 && (
                        <Empty key="empty-ayat" />
                    )}
                </div>
            </div>
        </div>
    );
};

DetailAyat.propTypes = {
    ayatData: PropTypes.array.isRequired 
};

export default DetailAyat;
