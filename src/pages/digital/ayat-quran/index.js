import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSuratDetail } from "../../../services/apiService"; // Import fungsi getSuratDetail
import NavbarDetail from "../../../components/Navbar/NavbarDetail";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import DetailAyat from "../../../components/Digital/DetailAyat";
import Footer from '../../../components/Footer';

function App() {
  const [ayatSurat, setAyatSurat] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Mengambil slug surat dari parameter URL menggunakan useParams()
  const { slug } = useParams();

  useEffect(() => {
    async function getSurat() {
      setLoading(true);
      try {
        const response = await getSuratDetail(slug); // Mengambil data surat berdasarkan slug
        if (response.success) {
          setAyatSurat(response.data.ayat_surats);
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      }
    }
    getSurat();
  }, [slug]); // Dipanggil setiap kali nilai slug berubah

  return (
    <>
      <NavbarDetail 
        navColor={`#6B5656`}
      />
      {loading && <Loading />}
      {error && <Error />}
      {ayatSurat.length > 0 && <DetailAyat ayatData={ayatSurat} useHTML={true} />} 

      <Footer/>
    </>
  );
}

export default App;
