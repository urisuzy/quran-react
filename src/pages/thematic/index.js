import React, { useState, useEffect, useRef } from "react";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import NavbarBg from "../../components/Navbar/NavbarBg";
import Title from "../../components/Title";
import Back from "../../components/Back";
import Footer from "../../components/Footer";
import Empty from "../../components/Error";
import Layout from "../../components/Layout";
import TafsirModal from "../../components/Thematic/ModalTafsir"; // Import the new modal component
import audioLogo from "../../assets/images/play-svg.svg";
import pauseLogo from "../../assets/images/play-pause.svg";
import copyLogo from "../../assets/images/copy-svg.svg";
import tafsirLogo from "../../assets/images/note-svg.svg";
import {
  getTemes,
  getSubTemes,
  getSubsubTemes,
  getContentContentTemes,
} from "../../services/apiService";

function App() {
  const [temes, setTemes] = useState([]);
  const [subtemes, setSubtemes] = useState([]);
  const [subsubtemes, setSubsubtemes] = useState([]);
  const [contentThemes, setContentThemes] = useState([]);
  const [selectedTeme, setSelectedTeme] = useState("");
  const [selectedSubteme, setSelectedSubteme] = useState("");
  const [selectedSubsubteme, setSelectedSubsubteme] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTafsirModalOpen, setIsTafsirModalOpen] = useState(false); // State for modal visibility
  const [selectedTafsir, setSelectedTafsir] = useState(""); // State for selected tafsir text
  const [playingAudioUrl, setPlayingAudioUrl] = useState(""); // State for currently playing audio
  const audioRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    async function fetchData() {
      try {
        const temesResponse = await getTemes();
        if (temesResponse && temesResponse.success && temesResponse.data) {
          setTemes(temesResponse.data);
        } else {
          throw new Error("Failed to fetch themes");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleThemeChange = async (event) => {
    const themeId = event.target.value;
    setSelectedTeme(themeId);
    setLoading(true);
    setError(null);
    try {
      const subtemesResponse = await getSubTemes(themeId);
      if (
        subtemesResponse &&
        subtemesResponse.success &&
        subtemesResponse.data
      ) {
        setSubtemes(subtemesResponse.data);
        setSelectedSubteme("");
        setSubsubtemes([]);
        setContentThemes([]);
      } else {
        throw new Error("Failed to fetch sub themes");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubThemeChange = async (event) => {
    const subThemeId = event.target.value;
    setSelectedSubteme(subThemeId);
    setLoading(true);
    setError(null);
    try {
      const subsubtemesResponse = await getSubsubTemes(subThemeId);
      if (
        subsubtemesResponse &&
        subsubtemesResponse.success &&
        subsubtemesResponse.data
      ) {
        setSubsubtemes(subsubtemesResponse.data);
        setSelectedSubsubteme("");
        setContentThemes([]);
      } else {
        throw new Error("Failed to fetch sub sub themes");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubsubtemeChange = async (event) => {
    const subSubThemeId = event.target.value;
    setSelectedSubsubteme(subSubThemeId);
    setLoading(true);
    setError(null);
    try {
      const contentThemesResponse = await getContentContentTemes(subSubThemeId);
      if (
        contentThemesResponse &&
        contentThemesResponse.success &&
        contentThemesResponse.data
      ) {
        setContentThemes(contentThemesResponse.data);
      } else {
        throw new Error("Failed to fetch content themes");
      }
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toastr.success('Text copied to clipboard');
  };

  const handlePlayPause = (audioUrl) => {
    if (audioRef.current) {
      audioRef.current.pause();
      if (playingAudioUrl === audioUrl) {
        setPlayingAudioUrl("");
        return;
      }
    }

    const audio = document.getElementById(`audio-${audioUrl}`);
    if (audio) {
      audioRef.current = audio;
      audio.play();
      setPlayingAudioUrl(audioUrl);
    }
  };

  const handleTafsirClick = (tafsir) => {
    setSelectedTafsir(tafsir);
    setIsTafsirModalOpen(true);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = contentThemes.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(contentThemes.length / itemsPerPage);

  return (
    <>
      <NavbarBg />
      <Title
        caption={
          "Dikembangkan Oleh Universitas KH Ruhiat Cipasung<br/>Kementerian Agama Republik Indonesia"
        }
        useHTML={true}
      />

      <Layout>
        <Back
          title={"Al-Qur`an Tematik"}
          caption={"Al-Qur`an Tematik"}
          cardColor={"#4bc8d0"}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 justify-center">
          {loading && <p>Loading...</p>}
          {error && <p><Empty/></p>}
          {!loading && !error && (
            <>
              {temes.length > 0 && (
                <select
                  className="border rounded-lg p-2"
                  value={selectedTeme}
                  onChange={handleThemeChange}
                >
                  <option value="">Pilih Tema</option>
                  {temes.map((teme) => (
                    <option key={teme.id} value={teme.id}>
                      {teme.name}
                    </option>
                  ))}
                </select>
              )}

              {subtemes.length > 0 && (
                <select
                  className="border rounded-lg p-2"
                  value={selectedSubteme}
                  onChange={handleSubThemeChange}
                >
                  <option value="">Pilih Subtema</option>
                  {subtemes.map((subteme) => (
                    <option key={subteme.id} value={subteme.id}>
                      {subteme.name}
                    </option>
                  ))}
                </select>
              )}

              {subsubtemes.length > 0 && (
                <select
                  className="border rounded-lg p-2"
                  value={selectedSubsubteme}
                  onChange={handleSubsubtemeChange}
                >
                  <option value="">Pilih Sub Subtema</option>
                  {subsubtemes.map((subsubteme) => (
                    <option key={subsubteme.id} value={subsubteme.id}>
                      {subsubteme.name}
                    </option>
                  ))}
                </select>
              )}
            </>
          )}
        </div>

        <div className="mt-4">
          {!loading && !error && contentThemes.length === 0 && <Empty />}
          {!loading && !error && currentItems.length > 0 && (
            <ul>
              {currentItems.map((content, index) => (
                <li key={index} className="border-b border-gray-300 py-4">
                  <div className="flex flex-col py-5 space-y-4">
                    <h3
                      className="text-md font-semibold"
                      dangerouslySetInnerHTML={{ __html: content.deskripsi }}
                    ></h3>
                    <div className="flex flex-row justify-between items-center px-4 py-4">
                      <div className="flex-shrink-0 py-2 px-4 border border-black rounded-2xl">
                        <p className="font-bold text-2xl">{content.ayat_surat?.nomor_ayat}</p>
                      </div>
                      <div className="ml-4 text-left">
                        <p className="text-3xl text-right">{content.ayat_surat?.teks_arab}</p>
                        <p className="text-md text-gray-500 mt-2">{content.ayat_surat?.teks_latin}</p>
                      </div>
                    </div>

                    <p className="text-base text-gray-500">{content.ayat_surat?.teks_indonesia}</p>
                    <p className="text-base text-gray-500">{content.ayat_surat?.teks_inggris}</p>
                    <div className="mt-4 space-x-4">
                      <button onClick={() => handlePlayPause(content.ayat_surat?.audio_lima)}>
                        <img 
                          src={playingAudioUrl === content.ayat_surat?.audio_lima ? pauseLogo : audioLogo} 
                          alt={playingAudioUrl === content.ayat_surat?.audio_lima ? "Pause" : "Play"} 
                          className="w-6 h-6" 
                        />
                      </button>
                      <button onClick={() => handleCopy(content.ayat_surat?.teks_arab)}>
                        <img src={copyLogo} alt="Copy" className="w-6 h-6" />
                      </button>
                      <button onClick={() => handleTafsirClick(content.ayat_surat?.tafsir)}>
                        <img src={tafsirLogo} alt="Tafsir" className="w-6 h-6" />
                      </button>
                    </div>
                    <audio id={`audio-${content.ayat_surat?.audio_lima}`} src={content.ayat_surat?.audio_lima}></audio>

                    <hr className="my-4" />

                    <div className="mt-2">
                      <label className="block font-semibold">Hadith Terkait:</label>
                      <p className="text-base text-gray-500"
                        dangerouslySetInnerHTML={{ __html: content.hadith_tambah }}
                      ></p>
                    </div>

                    <hr className="my-4" />

                    <div>
                      <label className="block font-semibold">Referensi:</label>
                      <p className="text-base text-gray-500"
                        dangerouslySetInnerHTML={{ __html: content.referensi }}
                      ></p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}

          {!loading && !error && totalPages > 1 && (
            <div className="mt-4 flex justify-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`mx-1 px-3 py-1 border rounded ${
                    currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>

        <TafsirModal
          isOpen={isTafsirModalOpen}
          onClose={() => setIsTafsirModalOpen(false)}
          tafsir={selectedTafsir}
        />
      </Layout>

      <Footer />
    </>
  );
}

export default App;
