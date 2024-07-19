// App.js
import React, { useState, useEffect } from 'react';
import NavbarBg from '../../components/Navbar/NavbarBg';
import Title from '../../components/Title';
import Back from '../../components/Back';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import Footer from '../../components/Footer';
import Layout from '../../components/Layout'; // Menggunakan Layout sebagai nama komponen, karena LayoutQuran dan Layout sama saja
import GridPerawi from '../../components/Hadits/GridPerawi'; // Menggunakan GridPerawi sebagai nama komponen
import { getHadiths } from '../../services/apiService'; // Import fungsi getHadiths dari apiService

function App() {
    const [dataHadis, setDataHadis] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await getHadiths(); // Panggil fungsi getHadiths dari apiService
                setDataHadis(response.data); // Set data hadis ke state
                setLoading(false);
            } catch (error) {
                console.error(error);
                setError(true);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <NavbarBg />
            <Title
                caption={' Dikembangkan  Oleh Universitas KH Ruhiat Cipasung<br/>Kementerian Agama Republik Indonesia'}
                useHTML={true}
            />

            <Layout>
                <Back
                    title={'Hadits Tematik'}
                    caption={'Hadits Tematik'}
                    cardColor={'#cccccc'}
                />

                {loading && <Loading />}
                {error && <Error />}
                {!loading && !error && <GridPerawi dataHadis={dataHadis} />}

                <Footer />
            </Layout>
        </>
    );
}

export default App;
