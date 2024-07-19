import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { editTheme, updateTheme } from '../../../../services/apiService'; // Menggunakan editTheme dan updateTheme dari apiService
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

const EditContentTheme = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [themeData, setThemeData] = useState({
    name: '',
    slug: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTheme = async () => {
      try {
        const response = await editTheme(id); // Menggunakan editTheme untuk mendapatkan data tema
        setThemeData(response.data); // Set data tema ke dalam state
        setLoading(false);
      } catch (error) {
        console.error('Error fetching theme:', error);
      }
    };

    fetchTheme();
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
      await updateTheme(id, themeData); // Panggil updateTheme untuk memperbarui tema
      toastr.success('Theme updated successfully'); // Tampilkan notifikasi sukses menggunakan toastr
      navigate('/themes'); // Redirect kembali ke halaman tema setelah berhasil memperbarui
    } catch (error) {
      toastr.error('Failed to update theme.'); // Tampilkan notifikasi gagal menggunakan toastr
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full h-screen overflow-x-hidden border-t">
      <main className="w-full p-6">
        <h1 className="w-full text-3xl text-black pb-6">Edit Theme</h1>
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
            <div className="leading-loose">
              <form onSubmit={handleSubmit} className="p-10 bg-white rounded shadow-xl">
                <div className="">
                  <label className="block text-sm text-gray-600" htmlFor="name">Name</label>
                  <input className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded" id="name" name="name" type="text" required value={themeData.name} onChange={handleChange} placeholder="Theme Name" aria-label="Name" />
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

export default EditContentTheme;
