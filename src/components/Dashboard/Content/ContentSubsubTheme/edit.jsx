import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editSubsubTheme, updateSubsubTheme, getSubThemes, getThemes } from '../../../../services/apiService';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const EditContentSubsubTheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subThemeData, setSubThemeData] = useState({
    name: '',
    slug: '',
    sub_theme_id: '',
    theme_id: ''
  });
  const [themes, setThemes] = useState([]);
  const [subThemes, setSubThemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [subThemeResponse, subThemesResponse, themesResponse] = await Promise.all([editSubsubTheme(id), getSubThemes(), getThemes()]);
        const subThemeData = subThemeResponse.data;
        setSubThemeData(subThemeData);
        setSubThemes(subThemesResponse.data);
        setThemes(themesResponse.data);

        // Extract theme ID from the subtheme information
        const themeId = subThemeData.subtheme ? subThemeData.subtheme.theme_id : '';

        // Set the theme ID in the state
        setSubThemeData(prevState => ({
          ...prevState,
          theme_id: themeId
        }));

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'theme_id') {
      // If the changed field is theme_id, update sub_theme_id based on the related subtheme
      const selectedThemeId = value;
      const relatedSubThemes = subThemes.filter(subTheme => subTheme.theme_id === selectedThemeId);
      const defaultSubThemeId = relatedSubThemes.length > 0 ? relatedSubThemes[0].id : '';
      setSubThemeData(prevState => ({
        ...prevState,
        theme_id: value,
        sub_theme_id: defaultSubThemeId // Set sub_theme_id to the first subtheme related to the selected theme
      }));
    } else {
      // If the changed field is not theme_id, directly update the state based on the input
      setSubThemeData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateSubsubTheme(id, subThemeData);
      toastr.success('Subsubtheme updated successfully');
      navigate('/subsubthemes');
    } catch (error) {
      toastr.error('Failed to update subsubtheme.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen overflow-x-hidden border-t">
      <main className="w-full p-6">
        <h1 className="w-full text-3xl text-black pb-6">Edit SubsubTheme</h1>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
            <div className="leading-loose">
              <form onSubmit={handleSubmit} className="p-10 bg-white rounded shadow-xl">
                <div className="">
                  <label className="block text-sm text-gray-600" htmlFor="name">Name</label>
                  <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="name" name="name" type="text" required value={subThemeData.name} onChange={handleChange} placeholder="Theme Name" aria-label="Name" />
                </div>
                <div className="mt-4">
                  <label className="block text-sm text-gray-600" htmlFor="theme_id">Choose Theme</label>
                  <select name="theme_id" id="theme_id" className='w-full px-5 py-1 text-gray-700 bg-gray-200 rounded' value={subThemeData.theme_id} onChange={handleChange}>
                    <option value="">Select a theme</option>
                    {themes.map(theme => (
                      <option key={theme.id} value={theme.id}>{theme.name}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-4">
                  <label className="block text-sm text-gray-600" htmlFor="sub_theme_id">Choose SubTheme</label>
                  <select name="sub_theme_id" id="sub_theme_id" className='w-full px-5 py-1 text-gray-700 bg-gray-200 rounded' value={subThemeData.sub_theme_id} onChange={handleChange}>
                    <option value="">Select a subtheme</option>
                    {subThemes.filter(subTheme => subTheme.theme_id === subThemeData.theme_id).map(subTheme => (
                      <option key={subTheme.id} value={subTheme.id}>{subTheme.name}</option>
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

export default EditContentSubsubTheme;
