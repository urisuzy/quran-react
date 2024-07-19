import React, { useState, useEffect } from 'react';
import { getThemes, storeSubThemes } from '../../../../services/apiService';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const CreateContentSubThemes = () => {
    const [formCount, setFormCount] = useState(1);
    const [themes, setThemes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchThemes = async () => {
            try {
                const response = await getThemes();
                setThemes(response.data);
            } catch (error) {
                console.error('Failed to fetch themes:', error);
                toastr.error('Failed to fetch themes');
            }
        };
    
        fetchThemes();
    }, []);
    
    const handleAddForm = () => {
        setFormCount(prevCount => prevCount + 1);
    };

    const handleSubmit = async () => {
        try {
            const subThemesData = [];

            for (let i = 0; i < formCount; i++) {
                const nameInput = document.getElementById(`name${i}`);
                const themeIdInput = document.getElementById(`theme_id${i}`);

                const name = nameInput.value.trim();
                const themeId = themeIdInput.value.trim();

                if (name && themeId) {
                    subThemesData.push({ name, theme_id: themeId });
                }
            }

            if (subThemesData.length === 0) {
                throw new Error('At least one subtheme must be added.');
            }

            await storeSubThemes(subThemesData);

            navigate('/subthemes');

            toastr.success('Subthemes stored successfully');
        } catch (error) {
            console.error('Failed to store subthemes:', error);
            toastr.error('Failed to store subthemes');
        }
    };

    const handleRemoveForm = () => {
        setFormCount(prevCount => prevCount - 1);
    };

    return (
        <div className="w-full h-screen overflow-x-hidden border-t">
            <main className="w-full p-6">
                <h1 className="w-full text-3xl text-black pb-6">Forms SubTheme</h1>
                <div className="flex flex-wrap">
                    {[...Array(formCount)].map((_, index) => (
                        <div key={index} className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
                            <div className="leading-loose">
                                <form key={index} className="p-10 bg-white rounded shadow-xl">
                                    <div className="">
                                        <label className="block text-sm text-gray-600" htmlFor={`name${index}`}>Name SubTheme</label>
                                        <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id={`name${index}`} name={`name${index}`} type="text" required placeholder="Enter subtheme name" aria-label="Name" />
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600" htmlFor={`theme_id${index}`}>Pilih Tema</label>
                                        <select name={`theme_id${index}`} id={`theme_id${index}`} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                                            {themes.map(theme => (
                                                <option key={theme.id} value={theme.id}>{theme.name}</option>
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

export default CreateContentSubThemes;
