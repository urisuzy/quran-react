import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editContentTheme, updateContentTheme, getThemes, getSubThemes, getSubsubThemes, getSurats, getSuratDetailById, getHadiths, getHadithDetailById } from '../../../../services/apiService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditContentTheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [themeData, setThemeData] = useState({
    deskripsi: '',
    referensi: '',
    hadith_tambah: '',
    themeId: '',
    subThemeId: '',
    subsub_theme_id: '',
    suratId: '',
    ayat_surat_id: '',
    hadithId: '',
    ayat_hadith_id: ''
  });
  const [loading, setLoading] = useState(true);
  const [themes, setThemes] = useState([]);
  const [subthemes, setSubthemes] = useState([]);
  const [subsubthemes, setSubsubthemes] = useState([]);
  const [surats, setSurats] = useState([]);
  const [hadiths, setHadiths] = useState([]);
  const [selectedSuratAyat, setSelectedSuratAyat] = useState([]);
  const [selectedHadithDetail, setSelectedHadithDetail] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const themeResponse = await getThemes();
        const suratResponse = await getSurats();
        const hadithResponse = await getHadiths();

        setThemes(themeResponse.data);
        setSurats(suratResponse.data);
        setHadiths(hadithResponse.data);

        const editResponse = await editContentTheme(id);

        setThemeData(prevState => ({
          ...prevState,
          deskripsi: editResponse.data.deskripsi,
          referensi: editResponse.data.referensi,
          hadith_tambah: editResponse.data.hadith_tambah,
          themeId: editResponse.data.themeId,
          subThemeId: editResponse.data.subThemeId,
          subsub_theme_id: editResponse.data.subSubThemeId,
          suratId: editResponse.data.suratId,
          ayat_surat_id: editResponse.data.ayatSuratId,
          hadithId: editResponse.data.hadithId,
          ayat_hadith_id: editResponse.data.ayatHadithId
        }));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchSuratDetail = async () => {
      try {
        if (themeData.suratId) {
          const suratDetailResponse = await getSuratDetailById(themeData.suratId);
          setSelectedSuratAyat(suratDetailResponse.data.ayat_surats);
        } else {
          setSelectedSuratAyat([]);
        }
      } catch (error) {
        console.error('Error fetching surat detail:', error);
      }
    };

    fetchSuratDetail();
  }, [themeData.suratId]);

  useEffect(() => {
    const fetchHadithDetail = async () => {
      try {
        if (themeData.hadithId) {
          const hadithDetailResponse = await getHadithDetailById(themeData.hadithId);
          setSelectedHadithDetail(hadithDetailResponse.data.ayat_hadiths);
        } else {
          setSelectedHadithDetail([]);
        }
      } catch (error) {
        console.error('Error fetching hadith detail:', error);
      }
    };

    fetchHadithDetail();
  }, [themeData.hadithId]);

  const handleChange = (field, value) => {
    setThemeData(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const handleThemeChange = async (event) => {
    const { value } = event.target;
    setThemeData(prevState => ({
      ...prevState,
      themeId: value,
      subThemeId: '',
      subsub_theme_id: '',
    }));

    try {
      const subthemeResponse = await getSubThemes(value);
      setSubthemes(subthemeResponse.data);
    } catch (error) {
      console.error('Error fetching subthemes:', error);
    }
  };

  const handleSubThemeChange = async (event) => {
    const { value } = event.target;
    setThemeData(prevState => ({
      ...prevState,
      subThemeId: value,
      subsub_theme_id: '',
    }));

    try {
      const subsubthemeResponse = await getSubsubThemes(value);
      setSubsubthemes(subsubthemeResponse.data);
    } catch (error) {
      console.error('Error fetching subsubthemes:', error);
    }
  };

  const handleSuratChange = async (event) => {
    const { value } = event.target;
    setThemeData(prevState => ({
      ...prevState,
      suratId: value,
      ayat_surat_id: ''
    }));

    try {
      const suratDetailResponse = await getSuratDetailById(value);
      setSelectedSuratAyat(suratDetailResponse.data.ayat_surats);
    } catch (error) {
      console.error('Error fetching surat detail:', error);
    }
  };

  const handleHadithChange = async (event) => {
    const { value } = event.target;
    setThemeData(prevState => ({
      ...prevState,
      hadithId: value,
      ayat_hadith_id: ''
    }));

    try {
      const hadithDetailResponse = await getHadithDetailById(value);
      setSelectedHadithDetail(hadithDetailResponse.data.ayat_hadiths);
    } catch (error) {
      console.error('Error fetching hadith detail:', error);
    }
  };

  const handleHadithDetailChange = (event) => {
    const { value } = event.target;
    setThemeData(prevState => ({
      ...prevState,
      ayat_hadith_id: value
    }));

    if (value === "0") {
      // Jika "Hadith Tidak Ada" dipilih, hapus nilai tambahan hadith
      setThemeData(prevState => ({
        ...prevState,
        hadith_tambah: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Jika "Hadith Tidak Ada" dipilih, tidak menyertakan nilai hadith_tambah
      if (themeData.ayat_hadith_id === "0") {
        delete themeData.hadith_tambah;
      }
      await updateContentTheme(id, themeData);
      toastr.success('Theme updated successfully');
      navigate('/contentthemes');
    } catch (error) {
      console.error('Failed to update theme:', error);
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Validation Error:', error.response.data.message);
      } else {
        console.error('Validation Error: Unable to retrieve error message.');
      }
      toastr.error('Failed to update theme.');
    }
  };
  
  

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen overflow-x-hidden border-t">
      <main className="w-full p-6">
        <h1 className="w-full text-3xl text-black pb-6">Edit Theme</h1>
        <div className="flex flex-wrap">
          <div className="w-full">
            <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
              <form onSubmit={handleSubmit}>
                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Deskripsi
                    </label>
                    <ReactQuill
                      className="w-full bg-gray-200"
                      value={themeData.deskripsi}
                      onChange={(value) => handleChange('deskripsi', value)}
                    />
                  </div>
                </div>

                <div className="-mx-3 md:flex mb-2">
                  <div className="md:w-1/3 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="themeId">
                      Theme
                    </label>
                    <select
                      onChange={handleThemeChange}
                      value={themeData.themeId}
                      id="themeId"
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                    >
                      <option value="">Select Theme</option>
                      {themes.map(theme => (
                        <option key={theme.id} value={theme.id}>{theme.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:w-1/3 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="subThemeId">
                      Sub Theme
                    </label>
                    <select
                      onChange={handleSubThemeChange}
                      value={themeData.subThemeId}
                      id="subThemeId"
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                    >
                      <option value="">Select Sub Theme</option>
                      {subthemes.map(subtheme => (
                        <option key={subtheme.id} value={subtheme.id}>{subtheme.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:w-1/3 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="subsubThemeId">
                      Subsub Theme
                    </label>
                    <select
                      onChange={(e) => handleChange('subsub_theme_id', e.target.value)}
                      value={themeData.subsub_theme_id}
                      id="subsubThemeId"
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                    >
                      <option value="">Select Subsub Theme</option>
                      {subsubthemes.map(subsubtheme => (
                        <option key={subsubtheme.id} value={subsubtheme.id}>{subsubtheme.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="-mx-3 md:flex mb-2">
                  <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="suratId">
                      Surat
                    </label>
                    <select
                      onChange={handleSuratChange}
                      value={themeData.suratId}
                      id="suratId"
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                    >
                      <option value="">Select Surat</option>
                      {surats.map(surat => (
                        <option key={surat.id} value={surat.id}>{surat.nama_latin}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="ayatSuratId">
                      Ayat Surat Detail
                    </label>
                    <select
                      onChange={(e) => handleChange('ayat_surat_id', e.target.value)}
                      value={themeData.ayat_surat_id}
                      id="ayatSuratId"
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                    >
                      <option value="">Pilih Detail Ayat Surat</option>
                      {selectedSuratAyat && selectedSuratAyat.map(ayat => (
                        <optgroup key={ayat.id} label={ayat.teks_arab}>
                          <option value={ayat.id}>{ayat.teks_arab}</option>
                          <option value={ayat.id}>{ayat.teks_indonesia}</option>
                        </optgroup>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="-mx-3 md:flex mb-2">
                  <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="hadithId">
                      Hadith
                    </label>
                    <select
                      onChange={handleHadithChange}
                      value={themeData.hadithId}
                      id="hadithId"
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                    >
                      <option value="">Select Hadith</option>
                      {hadiths.map((hadith, idx) => (
                        <option key={idx} value={hadith.id}>{hadith.name_hadith}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="ayatHadithId">
                      Ayat Hadith Detail
                    </label>
                    <select
                      onChange={handleHadithDetailChange}
                      value={themeData.ayat_hadith_id}
                      id="ayatHadithId"
                      className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                    >
                      <option value="">Select Ayat Hadith Detail</option>
                      {selectedHadithDetail.map((detail, idx) => (
                        <option key={idx} value={detail.id}>{detail.arab}</option>
                      ))}
                      <option value="0">Hadith Tidak Ada</option>
                    </select>
                  </div>
                </div>

                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Hadith Tambah
                    </label>
                    <ReactQuill
                      className="w-full bg-gray-200"
                      value={themeData.hadith_tambah}
                      onChange={(value) => handleChange('hadith_tambah', value)}
                      disabled={themeData.ayat_hadith_id !== "0"}
                    />
                  </div>
                </div>

                <div className="-mx-3 md:flex mb-6">
                  <div className="md:w-full px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" htmlFor="grid-last-name">
                      Referensi
                    </label>
                    <ReactQuill
                      className="w-full bg-gray-200"
                      value={themeData.referensi}
                      onChange={(value) => handleChange('referensi', value)}
                    />
                  </div>
                </div>

                <div className="md:flex md:items-center">
                  <div className="md:w-1/3"></div>
                  <div className="md:w-2/3">
                    <button
                      className="shadow bg-green-500 hover:bg-green-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Update Content Theme
                    </button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditContentTheme;
