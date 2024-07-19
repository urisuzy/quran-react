import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getThemes, getSubThemes, getContentThemes, getSubsubThemes, destroyContentTheme } from '../../../../services/apiService';
import Loading from '../../../Loading';
import Error from '../../../Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const ContentContentTheme = () => {
  const [themes, setThemes] = useState([]);
  const [subThemes, setSubThemes] = useState([]);
  const [contentThemes, setContentThemes] = useState([]);
  const [subsubThemes, setSubsubThemes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching content themes...');
        const themesData = await getThemes();
        console.log('Themes:', themesData);
        const subThemesData = await getSubThemes();
        console.log('Sub Themes:', subThemesData);
        const contentThemesData = await getContentThemes();
        console.log('Content Themes:', contentThemesData);
        const subsubThemesData = await getSubsubThemes();
        console.log('Subsub Themes:', subsubThemesData);
        setThemes(themesData.data);
        setSubThemes(subThemesData.data);
        setContentThemes(contentThemesData.data);
        setSubsubThemes(subsubThemesData.data);
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

  const handleDeleteContentTheme = async (contentThemeId) => {
    try {
      await destroyContentTheme(contentThemeId);
      const contentThemesData = await getContentThemes();
      setContentThemes(contentThemesData.data);
      toastr.success('Content theme deleted successfully');
    } catch (error) {
      console.error('Error deleting content theme:', error);
      setError(error);
      toastr.error('Failed to delete content theme');
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  const filteredContentThemes = Array.isArray(contentThemes) && contentThemes.length > 0
    ? contentThemes.filter((contentTheme) =>
        contentTheme && contentTheme.deskripsi && contentTheme.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) // Menggunakan deskripsi sebagai kriteria pencarian
      )
    : [];

  const indexOfLastContentTheme = currentPage * perPage;
  const indexOfFirstContentTheme = indexOfLastContentTheme - perPage;
  const currentContentThemes = filteredContentThemes.slice(indexOfFirstContentTheme, indexOfLastContentTheme);

  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black mb-4">Dashboard Content Theme</h1>
        <Link to="/contentthemes/create">
          <button className="px-2 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl mb-4">Tambah Content Theme</button>
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
            <span className="text-gray-500 text-sm">Showing {currentContentThemes.length} results</span>
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
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Deskripsi</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Surat ID</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Hadits ID (Opsional)</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">SubsubTheme ID</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Subsubtheme Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Tambahan Hadits (Opsional)</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Referensi</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredContentThemes.length === 0 ? (
                <tr>
                  <td className="border px-4 py-2" colSpan="12">No content themes found.</td>
                </tr>
              ) : (
                currentContentThemes.map((contentTheme) => {
                  const subsubTheme = subsubThemes.find(subsub => subsub.id === contentTheme.subsub_theme_id);
                  const subTheme = subsubTheme ? subThemes.find(sub => sub.id === subsubTheme.sub_theme_id) : null;
                  const theme = subTheme ? themes.find(theme => theme.id === subTheme.theme_id) : null;

                  return (
                    <tr key={contentTheme.id}>
                      <td className="border px-4 py-2">{contentTheme.id}</td>
                      <td className="border px-4 py-2">{contentTheme.deskripsi}</td>
                      <td className="border px-4 py-2">{contentTheme.ayat_surat_id}</td>
                      <td className="border px-4 py-2">{contentTheme.ayat_hadith_id}</td>
                      <td className="border px-4 py-2">{contentTheme.subsub_theme_id}</td>
                      <td className="border px-4 py-2">{subsubTheme ? subsubTheme.name : ''}</td>
                      <td className="border px-4 py-2">{contentTheme.hadith_tambah}</td>
                      <td className="border px-4 py-2">{contentTheme.referensi}</td>
                      <td className="border px-4 py-2">
                        <Link to={`/contentthemes/${contentTheme.id}/edit`}>
                          <button className="mr-2 text-blue-500">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </Link>
                        <button className="text-red-500" onClick={() => handleDeleteContentTheme(contentTheme.id)}>
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center mt-4">
          <button className="mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
          <button className="mx-1 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        </div>
      </main>
    </div>
  );
};

export default ContentContentTheme;
