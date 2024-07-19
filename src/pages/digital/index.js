// App.js
import React, { useState, useEffect } from 'react';
import NavbarBg from '../../components/Navbar/NavbarBg';
import Title from '../../components/Title';
import Back from '../../components/Back';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Footer from '../../components/Footer';
import LayoutQuran from '../../components/Layout';
import GridListSurat from '../../components/Digital/GridListSurat';
import Input from '../../components/Search/Input';
import { getSurats } from '../../services/apiService'; 

const App = () => {
    const [dataSurah, setDataSurah] = useState([]);
    const [originalDataSurah, setOriginalDataSurah] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function getSurah() {
            setLoading(true);
            try {
                const surats = await getSurats(); 
                setDataSurah(surats.data);
                setOriginalDataSurah(surats.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(true);
                setLoading(false);
            }
        }
    
        getSurah();
    }, []);
    
    const handleSearch = (query) => {

        if (!query.trim()) {
            setDataSurah(originalDataSurah);
        } else {
            const searchData = originalDataSurah.filter((surah) =>
                surah.nama_latin.toLowerCase().includes(query.toLowerCase())
            );
            setDataSurah(searchData);
        }
    };

    return (
        <>
            <NavbarBg />
            <Title
                caption={' Dikembangkan  Oleh Universitas KH Ruhiat Cipasung<br/>Kementerian Agama Republik Indonesia'}
                useHTML={true}
            />

            <LayoutQuran>
                <Back cardColor={'#a79191'} title={'Al-Quran Digital'} caption={'Al-Quran 30 Juz'} />

                <Input onSearch={handleSearch} placeholder={'Cari Surat Al-Quran'} />

                {loading && <Loading />}
                {error && <Error />}
                {!loading && !error && <GridListSurat dataSurah={dataSurah} originalDataSurah={originalDataSurah} />}

                <Footer />
            </LayoutQuran>
        </>
    );
}

export default App;
