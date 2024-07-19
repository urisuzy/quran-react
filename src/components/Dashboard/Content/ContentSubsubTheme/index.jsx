import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSubsubThemes, getThemes, destroySubsubTheme, getSubThemes } from '../../../../services/apiService'; 
import Loading from '../../../Loading'; 
import Error from '../../../Error'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import toastr from 'toastr'; 
import 'toastr/build/toastr.min.css'; 

const ContentSubsubTheme = () => {
  const [subsubThemes, setSubsubThemes] = useState([]);
  const [themes, setThemes] = useState([]); 
  const [subThemes, setSubThemes] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching subsub themes...');
        const subsubThemesData = await getSubsubThemes(); 
        const themesData = await getThemes(); 
        const subThemesData = await getSubThemes(); 
        console.log('Subsub Themes:', subsubThemesData);
        console.log('Themes:', themesData);
        console.log('Sub Themes:', subThemesData);
        setSubsubThemes(subsubThemesData.data);
        setThemes(themesData.data); 
        setSubThemes(subThemesData.data); 
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

  const handleDeleteSubsubTheme = async (subsubThemeId) => {
    try {
      await destroySubsubTheme(subsubThemeId);
      const subsubThemesData = await getSubsubThemes();
      setSubsubThemes(subsubThemesData.data); 
      toastr.success('Subsub theme deleted successfully'); 
    } catch (error) {
      console.error('Error deleting subsub theme:', error);
      setError(error);
      toastr.error('Failed to delete subsub theme'); 
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error.message} />;
  }

  const filteredSubsubThemes = Array.isArray(subsubThemes) && subsubThemes.length > 0
    ? subsubThemes.filter((subsubTheme) =>
        subsubTheme.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const indexOfLastSubsubTheme = currentPage * perPage;
  const indexOfFirstSubsubTheme = indexOfLastSubsubTheme - perPage;
  const currentSubsubThemes = filteredSubsubThemes.slice(indexOfFirstSubsubTheme, indexOfLastSubsubTheme);

  return (
    <div className="w-full overflow-x-hidden border-t flex flex-col">
      <main className="w-full flex-grow p-6">
        <h1 className="text-3xl text-black mb-4">Dashboard Subsub Theme</h1>
        <Link to="/subsubthemes/create">
          <button className="px-2 py-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl mb-4">Tambah SubSubTheme</button>
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
            <span className="text-gray-500 text-sm">Showing {currentSubsubThemes.length} results</span>
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
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Subsubtheme Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Subsubtheme Slug</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">SubTheme ID</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">SubTheme Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Theme ID</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Theme Name</th>
                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubsubThemes.length === 0 ? (
                <tr>
                  <td className="border px-4 py-2" colSpan="8">No subsub themes found.</td>
                </tr>
              ) : (
                currentSubsubThemes.map((subsubTheme) => {
                  const subTheme = subThemes.find(sub => sub.id === parseInt(subsubTheme.sub_theme_id, 10));
                  const theme = themes.find(theme => theme.id === parseInt(subTheme.theme_id, 10));

                  return (
                    <tr key={subsubTheme.id}>
                      <td className="border px-4 py-2">{subsubTheme.id}</td>
                      <td className="border px-4 py-2">{subsubTheme.name}</td>
                      <td className="border px-4 py-2">{subsubTheme.slug}</td>
                      <td className="border px-4 py-2">{subsubTheme.sub_theme_id}</td>
                      <td className="border px-4 py-2">{subTheme ? subTheme.name : ''}</td>
                      <td className="border px-4 py-2">{theme ? theme.id : ''}</td>
                      <td className="border px-4 py-2">{theme ? theme.name : ''}</td>
                      <td className="border px-4 py-2">
                        <Link to={`/subsubthemes/${subsubTheme.id}/edit`}>
                          <button className="mr-2 text-blue-500">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </Link>
                        <button className="text-red-500" onClick={() => handleDeleteSubsubTheme(subsubTheme.id)}>
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

export default ContentSubsubTheme;
