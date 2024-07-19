import React, { useState, useEffect } from "react";

import NavbarDetail from '../../components/Navbar/NavbarDetail';
import Footer from '../../components/Footer';
import { ShowResultSavedAyatSurat } from "../../services/apiService"; 
import Loading from "../../components/Loading";
import Error from "../../components/Error";
import GridResultSaveAyat from '../../components/ResultSave/ResultSaveAyat/GridResultSaveAyat'; 

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [savedAyatSuratData, setSavedAyatSuratData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ShowResultSavedAyatSurat();
        setSavedAyatSuratData(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <NavbarDetail navColor={`#008631`} />
      {loading && <Loading />}
      {error && <Error />}
      {!loading && !error && (
        <GridResultSaveAyat ayatData={savedAyatSuratData} /> 
      )}
      <Footer />
    </>
  );
}

export default App;
