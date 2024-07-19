import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubThemes, getThemes, destroySubTheme } from '../../../../services/apiService'; // Import getSubThemes, getThemes, and destroySubTheme functions from apiService
import Loading from '../../../Loading'; // Import Loading component
import Error from '../../../Error'; // Import Error component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import toastr from 'toastr'; // Import toastr
import 'toastr/build/toastr.min.css'; // Import toastr CSS

const ContentSubTheme = () => {
  const [subThemes, setSubThemes] = useState([]);
  const [themes, setThemes] = useState([]); // State to store themes data
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching sub themes...');
        const subThemesData = await getSubThemes(); // Fetch sub themes data
        const themesData = await getThemes(); // Fetch themes data
        console.log('Sub Themes:', subThemesData);
        console.log('Themes:', themesData);
        setSubThemes(subThemesData.data);
        setThemes(themesData.data); // Set themes data to state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDeleteSubTheme = async (subThemeId) => {
    try {
      // Panggil fungsi destroySubTheme dengan ID sub tema sebagai argumen
      await destroySubTheme(subThemeId);
      // Ambil kembali data sub tema setelah penghapusan
      const subThemesData = await getSubThemes();
      setSubThemes(subThemesData.data); // Perbarui data sub tema setelah penghapusan
      toastr.success('Sub theme deleted successfully'); // Menampilkan pesan berhasil
    } catch (error) {
      console.error('Error deleting sub theme:', error);
      setError(error);
      toastr.error('Failed to delete sub theme'); // Menampilkan pesan gagal
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  const filteredSubThemes = Array.isArray(subThemes) && subThemes.length > 0
    ? subThemes.filter((subTheme) =>
        subTheme.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const indexOfLastSubTheme = currentPage * perPage;
  const indexOfFirstSubTheme = indexOfLastSubTheme - perPage;
  const currentSubThemes = filteredSubThemes.slice(indexOfFirstSubTheme, indexOfLastSubTheme);

  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black mb-4">Dashboard Sub Theme</h1>
        <Link to="/subthemes/create">
          <button className="px-2 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl mb-4">Tambah SubTheme</button>
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
            <span className="text-gray-500 text-sm">Showing {currentSubThemes.length} results</span>
          </div>
          <div>
            <select
              className="border rounded-md px-3 py-1 ml-2"
              value={perPage}
              onChange={(e) => setPerPage(e.target.value)}
            >
              <option value="5">5 per page</option>
              <option value="10">10 per page</option>
              <option value="20">20 per page</option>
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">ID</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Slug</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Theme ID</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Theme Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Check if there are sub themes to display */}
              {filteredSubThemes.length === 0 ? (
                <tr>
                  <td className="border px-4 py-2" colSpan="6">No sub themes found.</td>
                </tr>
              ) : (
                // Map over currentSubThemes to display sub themes
                currentSubThemes.map((subTheme) => (
                  <tr key={subTheme.id}>
                    <td className="border px-4 py-2">{subTheme.id}</td>
                    <td className="border px-4 py-2">{subTheme.name}</td>
                    <td className="border px-4 py-2">{subTheme.slug}</td>
                    <td className="border px-4 py-2">{subTheme.theme_id}</td>
                    <td className="border px-4 py-2">
                      {/* Find theme name based on theme_id */}
                      {themes.find(theme => theme.id === parseInt(subTheme.theme_id, 10))?.name}
                    </td>
                    <td className="border px-4 py-2">
                      {/* Add edit and delete buttons with FontAwesome icons */}
                      <Link to={`/subthemes/${subTheme.id}/edit`}>
                      <button className="mr-2 text-blue-500">
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      </Link>
                      <button className="text-red-500" onClick={() => handleDeleteSubTheme(subTheme.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Add pagination */}
        <div className="flex justify-center mt-4">
          <button className="mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          <button className="mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
      </main>
    </div>
  );
};

export default ContentSubTheme;
