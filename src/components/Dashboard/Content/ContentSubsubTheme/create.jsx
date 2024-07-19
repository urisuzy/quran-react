import React, { useState, useEffect } from 'react';
import { getThemes, getSubThemes, storeSubsubTheme } from '../../../../services/apiService';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const CreateContentSubsubThemes = () => {
    const [formCount, setFormCount] = useState(1);
    const [themes, setThemes] = useState([]);
    const [subThemes, setSubThemes] = useState([]);
    const [selectedThemeId, setSelectedThemeId] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const themesResponse = await getThemes();
                const subThemesResponse = await getSubThemes();

                setThemes(themesResponse.data);
                setSubThemes(subThemesResponse.data);
            } catch (error) {
                console.error('Failed to fetch themes and subthemes:', error);
                toastr.error('Failed to fetch themes and subthemes');
            }
        };

        fetchData();
    }, []);

    const handleAddForm = () => {
        setFormCount(prevCount => prevCount + 1);
    };

    const handleSubmit = async () => {
        try {
            const subsubThemesData = [];

            for (let i = 0; i < formCount; i++) {
                const nameInput = document.getElementById(`name${i}`);
                const subThemeId = document.getElementById(`sub_theme_id${i}`).value;

                if (nameInput && nameInput.value.trim() && subThemeId) {
                    subsubThemesData.push({ name: nameInput.value.trim(), sub_theme_id: subThemeId });
                }
            }

            if (subsubThemesData.length === 0) {
                throw new Error('At least one subtheme must be added.');
            }

            await storeSubsubTheme(subsubThemesData);

            navigate('/subsubthemes');

            toastr.success('Subthemes stored successfully');
        } catch (error) {
            console.error('Failed to store subthemes:', error);
            toastr.error('Failed to store subthemes');
        }
    };

    const handleRemoveForm = () => {
        setFormCount(prevCount => prevCount - 1);
    };

    const handleThemeChange = (event) => {
        setSelectedThemeId(event.target.value);
    };

    return (
        <div className="w-full h-screen overflow-x-hidden border-t">
            <main className="w-full p-6">
                <h1 className="w-full text-3xl text-black pb-6">Forms Sub Sub Theme</h1>
                <div className="flex flex-wrap">
                    {[...Array(formCount)].map((_, index) => (
                        <div key={index} className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
                            <div className="leading-loose">
                                <form key={index} className="p-10 bg-white rounded shadow-xl">
                                    <div className="">
                                        <label className="block text-sm text-gray-600" htmlFor={`name${index}`}>Name SubsubTheme</label>
                                        <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id={`name${index}`} name={`name${index}`} type="text" required placeholder="Enter subsubtheme name" aria-label="Name" />
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600" htmlFor={`theme_id${index}`}>Pilih Theme</label>
                                        <select onChange={handleThemeChange} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                                            <option value="">Select Theme</option>
                                            {themes.map(theme => (
                                                <option key={theme.id} value={theme.id}>{theme.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600" htmlFor={`sub_theme_id${index}`}>Pilih Sub Theme</label>
                                        <select name={`sub_theme_id${index}`} id={`sub_theme_id${index}`} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                                            <option value="">Select Sub Theme</option>
                                            {subThemes.filter(subtheme => subtheme.theme_id === selectedThemeId).map(subtheme => (
                                                <option key={subtheme.id} value={subtheme.id}>{subtheme.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="mt-6 flex justify-between">
                                        {formCount > 1 && (
                                            <button className="px-4 py-1 text-white font-light tracking-wider bg-red-500 rounded" onClick={() => handleRemoveForm(index)}>Hapus Form</button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </div>
                    ))}
                    <div className="w-full lg:w-1/2 my-6 pl-0 lg:pl-2">
                        <div className="leading-loose">
                            <button className="px-4 py-1 text-white font-light tracking-wider bg-green-500 rounded" onClick={handleAddForm}>
                                Tambah Form
                            </button>
                            <button className="ml-4 px-4 py-1 text-white font-light tracking-wider bg-gray-900 rounded" type="submit" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreateContentSubsubThemes;
