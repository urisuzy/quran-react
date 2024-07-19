import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeTheme } from '../../../../services/apiService';
import toastr from 'toastr'; // Import toastr
import 'toastr/build/toastr.min.css';

const CreateContentTheme = () => {
    const [formCount, setFormCount] = useState(1); // State untuk melacak jumlah formulir
    const navigate = useNavigate();

    const handleAddForm = () => {
        setFormCount(prevCount => prevCount + 1); // Menambah jumlah formulir saat tombol "Tambah Form" ditekan
    };

    const handleSubmit = async () => {
        try {
            const themeData = {};
            for (let i = 0; i < formCount; i++) {
                const name = document.getElementById(`name${i}`).value;
                if (!themeData['name']) {
                    themeData['name'] = [];
                }
                themeData['name'].push(name);
            }

            await storeTheme(themeData);
            // Tampilkan pesan toastr jika sukses
            toastr.success('Theme berhasil disimpan');
            // Navigasi kembali ke halaman /themes setelah berhasil menyimpan tema
            navigate('/themes');
        } catch (error) {
            console.error('Failed to store theme:', error);
            // Tampilkan pesan toastr jika gagal
            toastr.error('Gagal menyimpan theme');
            // Handle error
        }
    };

    const handleRemoveForm = () => {
        setFormCount(prevCount => prevCount - 1); // Mengurangi jumlah formulir saat tombol "Hapus Form" ditekan
    };

    return (
        <div className="w-full h-screen overflow-x-hidden border-t">
            <main className="w-full p-6">
                <h1 className="w-full text-3xl text-black pb-6">Forms Theme</h1>
                <div className="flex flex-wrap">
                    {[...Array(formCount)].map((_, index) => ( // Mapping array untuk membuat formulir sebanyak formCount
                        <div key={index} className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
                            <div className="leading-loose">
                                <form key={index} className="p-10 bg-white rounded shadow-xl">
                                    <div className="">
                                        <label className="block text-sm text-gray-600" htmlFor={`name${index}`}>Name</label>
                                        <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id={`name${index}`} name={`name${index}`} type="text" required placeholder="tulis theme" aria-label="Name" />
                                    </div>

                                    <div className="mt-6 flex justify-between">
                                        {formCount > 1 && ( // Hanya tampilkan tombol "Hapus Form" jika jumlah formulir lebih dari satu
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

export default CreateContentTheme;
