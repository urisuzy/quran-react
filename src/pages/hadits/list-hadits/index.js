import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import Error from "../../../components/Error";
import GridListHadis from "../../../components/Hadits/GridListHadis";
import Footer from "../../../components/Footer";
import NavbarDetail from "../../../components/Navbar/NavbarDetail";
import Input from '../../../components/Search/Input'
import { getHadithDetail } from "../../../services/apiService";

function App() {
    const { slug } = useParams();
    const [listHadis, setListHadis] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredHadis, setFilteredHadis] = useState([]);
    const [zoomFactor, setZoomFactor] = useState(1);

    useEffect(() => {
        async function getListHadis() {
            setLoading(true);
            try {
                const response = await getHadithDetail(slug);
                if (response.success) {
                    setListHadis(response.data.ayat_hadiths);
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
        getListHadis();
    }, [slug]);

    useEffect(() => {
        // Filter daftar hadis berdasarkan pencarian
        const filtered = listHadis.filter(hadis =>
            hadis.arab.toLowerCase().includes(searchQuery.toLowerCase()) ||
            hadis.indonesia.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredHadis(filtered);
        // Mengatur total halaman berdasarkan daftar hadis yang difilter
        const totalPagesCount = Math.ceil(filtered.length / 10);
        setTotalPages(totalPagesCount);
        // Mengatur halaman saat ini ke 1 ketika daftar hadis berubah karena pencarian
        setCurrentPage(1);
    }, [listHadis, searchQuery]);

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const renderPagination = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 5); 
        const endPage = Math.min(totalPages, startPage + 9); 

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`pagination-button px-4 py-2 mr-2 rounded ${currentPage === i ? 'text-white bg-[#ccc] font-bold' : 'text-black font-medium'}`}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const zoomAyat = (factor) => {
        setZoomFactor(factor);
    };

    const renderAyat = (text) => {
        return (
            <div style={{ fontSize: `${zoomFactor}em`, marginTop: '10px' }}>
                {text}
            </div>
        );
    };

    return (
        <>
            <NavbarDetail navColor={`#ccc`} />
            <Input placeholder={'cari hadits'} onSearch={handleSearch} />
            <div className="zoom-buttons flex justify-end mt-4 pr-8">
                <button onClick={() => zoomAyat(zoomFactor + 0.1)} className="zoom-button" style={{ marginRight: '8px' }}>
                    <img src="https://img.icons8.com/ios/50/000000/zoom-in.png" alt="Perbesar" />
                </button>
                <button onClick={() => zoomAyat(zoomFactor - 0.1)} className="zoom-button">
                    <img src="https://img.icons8.com/ios/50/000000/zoom-out.png" alt="Perkecil" />
                </button>
            </div>
            {loading && <Loading />}
            {error && <Error />}
            {filteredHadis.length === 0 && <Error message="Tidak ada hasil yang ditemukan" />}
            {filteredHadis.length > 0 && (
                <>
                    <GridListHadis hadisData={filteredHadis.slice((currentPage - 1) * 10, currentPage * 10).map(hadis => ({
                        ...hadis,
                        arab: renderAyat(hadis.arab), // Render ayat dengan fungsi renderAyat
                        indonesia: renderAyat(hadis.indonesia) // Render terjemahan dengan fungsi renderAyat
                    }))} />
                    {totalPages > 1 && (
                        <div className="pagination mt-4 flex justify-center">
                            {renderPagination()}
                        </div>
                    )}
                </>
            )}
            <Footer />
        </>
    );
}

export default App;
