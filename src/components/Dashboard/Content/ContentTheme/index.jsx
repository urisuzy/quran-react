import React, { useState, useEffect } from 'react';
import { getThemes, destroyTheme } from '../../../../services/apiService';
import Loading from '../../../Loading'; // Impor komponen Loading
import Error from '../../../Error'; // Impor komponen Error
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import toastr from 'toastr'; // Impor toastr
import 'toastr/build/toastr.min.css'; // Impor file css toastr

const ContentTheme = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState(null); // State untuk menyimpan informasi kesalahan
  const [modalOpen, setModalOpen] = useState(false);
  const [themeIdToDelete, setThemeIdToDelete] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getThemes();
        setData(response.data);
        setLoading(false);
        if (response.data.length === 0) {
          setNoData(true);
        }
      } catch (error) {
        setError(error); // Tangkap kesalahan dan simpan informasinya dalam state error
        setLoading(false); // Set loading menjadi false
      }
    };

    fetchData();
  }, []);

  const handlePerPageChange = async (newPerPage) => {
    setPerPage(newPerPage);
    setCurrentPage(1);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleDelete = async () => {
    try {
      await destroyTheme(themeIdToDelete);
      const newData = data.filter(theme => theme.id !== themeIdToDelete);
      setData(newData);
      toastr.success('Theme berhasil dihapus'); // Notifikasi toastr ketika berhasil menghapus tema
      setModalOpen(false);
    } catch (error) {
      console.error('Error deleting theme:', error);
    }
  };

  const handleModalOpen = (themeId) => {
    setThemeIdToDelete(themeId);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setThemeIdToDelete(null);
  };

  const filteredData = data.filter(item => {
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = Math.min(startIndex + perPage, filteredData.length);

  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black mb-4">Dashboard Theme</h1>
        <Link to="/themes/create">
          <button className="px-2 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl mb-4">Tambah Theme</button>
        </Link>
        <div className="flex justify-between mb-4">
          <div className="flex">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-md px-3 py-1 mr-2"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <span className="text-gray-500 text-sm">Showing {startIndex + 1} - {endIndex} of {filteredData.length} results</span>
          </div>
          <div>
            <select
              className="border rounded-md px-3 py-1 ml-2"
              value={perPage}
              onChange={(e) => handlePerPageChange(parseInt(e.target.value))}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
            </select>
          </div>
        </div>
        {/* Tampilkan komponen Loading jika loading masih true */}
        {loading && <Loading />}
        {/* Tampilkan pesan jika tidak ada data dalam tabel */}
        {noData ? (
          <div className="flex justify-center">
            <p>No data in table</p>
          </div>
        ) : (

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Slug</th>
                  <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Tampilkan pesan kesalahan jika terjadi kesalahan */}
                {error ? (
                  <tr>
                    <td colSpan="4">
                      <div className="flex justify-center">
                        <Error />
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredData.slice(startIndex, endIndex).map(theme => (
                    <tr key={theme.id}>
                      <td className="text-left py-3 px-4">{theme.id}</td>
                      <td className="text-left py-3 px-4">{theme.name}</td>
                      <td className="text-left py-3 px-4">{theme.slug}</td>
                      <td className="text-left py-3 px-4">
                        <button onClick={() => handleModalOpen(theme.id) } className='mr-2 text-red-500'>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                        <Link to={`/themes/${theme.id}/edit`}>
                          <button className='text-blue-500'>
                            <FontAwesomeIcon icon={faEdit} className="ml-2" />
                          </button>
                    
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
        <div className="flex justify-center mt-4">
          <button
            className="mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={endIndex === filteredData.length || filteredData.length === 0}
          >
            Next
          </button>
        </div>
      </main>

      {/* Modal Pop-up */}
      {modalOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <p>Are you sure you want to delete this theme?</p>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-gray-300 rounded-md mr-4" onClick={handleModalClose}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md" onClick={handleDelete}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentTheme;
