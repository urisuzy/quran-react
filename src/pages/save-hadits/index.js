// App.js
import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Footer from "../../components/Footer";
import NavbarDetail from "../../components/Navbar/NavbarDetail";
import { ShowResultSavedAyatHadith } from "../../services/apiService";
import GridResultListHadis from "../../components/ResultSave/ResultSaveHadith/GridResultListHadis";
import Input from "../../components/Search/Input";

function App() {
    const [savedAyatHadith, setSavedAyatHadith] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchKeyword, setSearchKeyword] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // Ganti jumlah item per halaman sesuai kebutuhan

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await ShowResultSavedAyatHadith();
                const resultAyatHadith = result.data;
                setSavedAyatHadith(resultAyatHadith);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const handleSearch = (query) => {
        setSearchKeyword(query);
        setCurrentPage(1); // Kembalikan halaman ke halaman pertama setiap kali melakukan pencarian
    };

    const filteredHadisData = savedAyatHadith.filter(hadis =>
        hadis.ayat_hadith.indonesia.toLowerCase().includes(searchKeyword.toLowerCase())
    );

    // Hitung jumlah halaman total berdasarkan jumlah data yang ada dan jumlah item per halaman
    const totalPages = Math.ceil(filteredHadisData.length / itemsPerPage);

    // Hitung index awal dan akhir data yang akan ditampilkan di halaman saat ini
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredHadisData.slice(indexOfFirstItem, indexOfLastItem);

    // Fungsi untuk berpindah ke halaman tertentu
    const goToPage = (page) => {
        setCurrentPage(page);
    };

    // Fungsi untuk merender tombol pagination
    const renderPagination = () => {
        const pages = [];
        const startPage = Math.max(1, currentPage - 5); 
        const endPage = Math.min(totalPages, startPage + 9); 

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`pagination-button px-4 py-2 mr-2 rounded ${currentPage === i ? 'text-white bg-[#000] font-bold' : 'text-black font-medium'}`}
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <>
            <NavbarDetail navColor={`#000`} />
            <Input onSearch={handleSearch} placeholderText="Search..." />
            {loading ? (
                <Loading />
            ) : (
                <>
                    <GridResultListHadis hadisData={currentItems} />
                    <div className="pagination-container flex justify-center my-4">
                        {renderPagination()}
                    </div>
                </>
            )}
            <Footer />
        </>
    );
}

export default App;
