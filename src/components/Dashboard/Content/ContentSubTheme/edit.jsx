import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editSubTheme, updateSubTheme, getThemes } from '../../../../services/apiService'; // Update import to include updateSubTheme
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const EditContentSubTheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [themeData, setThemeData] = useState({
    name: '',
    slug: '',
    theme_id: ''
  });
  const [themes, setThemes] = useState([]); // State to hold themes
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [themeResponse, themesResponse] = await Promise.all([editSubTheme(id), getThemes()]); // Fetch themes using getThemes
        setThemeData(themeResponse.data);
        setThemes(themesResponse.data); // Set themes state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setThemeData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSubTheme(id, themeData); // Use updateSubTheme instead of updateTheme
      toastr.success('Theme updated successfully');
      navigate('/subthemes');
    } catch (error) {
      toastr.error('Failed to update theme.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen overflow-x-hidden border-t">
      <main className="w-full p-6">
        <h1 className="w-full text-3xl text-black pb-6">Edit SubTheme</h1>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
            <div className="leading-loose">
              <form onSubmit={handleSubmit} className="p-10 bg-white rounded shadow-xl">
                <div className="">
                  <label className="block text-sm text-gray-600" htmlFor="name">Name</label>
                  <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="name" name="name" type="text" required value={themeData.name} onChange={handleChange} placeholder="Theme Name" aria-label="Name" />
                </div>
                <div className="mt-4">
                  <label className="block text-sm text-gray-600" htmlFor="theme_id">Choose Theme</label>
                  <select name="theme_id" id="theme_id" className='w-full px-5 py-1 text-gray-700 bg-gray-200 rounded' value={themeData.theme_id} onChange={handleChange}>
                    <option value="">Select a theme</option>
                    {themes.map(theme => (
                      <option key={theme.id} value={theme.id}>{theme.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-6">
                  <button className="px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit">Edit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EditContentSubTheme;
