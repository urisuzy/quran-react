import React, { useState, useEffect } from 'react';
import { getThemes, getSubThemes, getSubsubThemes, getHadiths, getHadithDetailById, getSurats, getSuratDetailById, storeContentTheme } from '../../../../services/apiService';
import { useNavigate } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreateContentContentThemes = () => {
    const [formCount, setFormCount] = useState(1);
    const [formsData, setFormsData] = useState([{
        selectedThemeId: '',
        subThemes: [],
        selectedSubThemeId: '',
        subSubThemes: [],
        selectedSubSubThemeId: '',
        selectedHadithId: '',
        selectedHadithDetail: [],
        hadithNotAvailable: false,
        quillText: '', // Inisialisasi quillText baru untuk setiap form
        surats: [],
        selectedSuratId: '',
        referensiQuillText: '',
        hadithTambahText: '',
        suratDetail: [],
        selectedAyatSuratId: '', // New property to store selected ayat surat id
    }]);
    const [themes, setThemes] = useState([]);
    const [hadiths, setHadiths] = useState([]);
    const [surats, setSurats] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const themesResponse = await getThemes();
                setThemes(themesResponse.data);
            } catch (error) {
                console.error('Failed to fetch themes:', error);
                toastr.error('Failed to fetch themes');
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchHadithsData = async () => {
            try {
                const hadithsResponse = await getHadiths();
                setHadiths(hadithsResponse.data);
            } catch (error) {
                console.error('Failed to fetch hadiths:', error);
                toastr.error('Failed to fetch hadiths');
            }
        };

        const fetchSuratsData = async () => {
            try {
                const suratsResponse = await getSurats();
                setSurats(suratsResponse.data);
            } catch (error) {
                console.error('Failed to fetch surats:', error);
                toastr.error('Failed to fetch surats');
            }
        };

        fetchHadithsData();
        fetchSuratsData();
    }, []);

    const handleThemeChange = async (event, index) => {
        const themeId = event.target.value;
        const updatedFormsData = [...formsData];
        updatedFormsData[index].selectedThemeId = themeId;
        try {
            const subThemesResponse = await getSubThemes(themeId);
            updatedFormsData[index].subThemes = subThemesResponse.data;
            setFormsData(updatedFormsData);
        } catch (error) {
            console.error('Failed to fetch sub themes:', error);
            toastr.error('Failed to fetch sub themes');
        }
    };

    const handleSubThemeChange = async (event, index) => {
        const subThemeId = event.target.value;
        const updatedFormsData = [...formsData];
        updatedFormsData[index].selectedSubThemeId = subThemeId;
        try {
            const subSubThemesResponse = await getSubsubThemes(subThemeId);
            updatedFormsData[index].subSubThemes = subSubThemesResponse.data;
            setFormsData(updatedFormsData);
        } catch (error) {
            console.error('Failed to fetch sub sub themes:', error);
            toastr.error('Failed to fetch sub sub themes');
        }
    };

    const handleSubSubThemeChange = async (event, index) => {
        const subSubThemeId = event.target.value;
        const updatedFormsData = [...formsData];
        updatedFormsData[index].selectedSubSubThemeId = subSubThemeId;
        setFormsData(updatedFormsData);
    };

    const handleHadithChange = async (event, index) => {
        const hadithId = event.target.value;
        const updatedFormsData = [...formsData];
        updatedFormsData[index].selectedHadithId = hadithId;
        try {
            const hadithDetailResponse = await getHadithDetailById(hadithId);
            updatedFormsData[index].selectedHadithDetail = hadithDetailResponse.data.ayat_hadiths || [];
            updatedFormsData[index].hadithNotAvailable = false;
            setFormsData(updatedFormsData);
        } catch (error) {
            console.error('Failed to fetch hadith detail:', error);
            toastr.error('Failed to fetch hadith detail');
        }
    };

    const handleSuratChange = async (event, index) => {
        const suratId = event.target.value;
        const updatedFormsData = [...formsData];
        updatedFormsData[index].selectedSuratId = suratId;
        try {
            const suratDetailResponse = await getSuratDetailById(suratId);
            updatedFormsData[index].suratDetail = suratDetailResponse.data.ayat_surats || [];
            setFormsData(updatedFormsData);
        } catch (error) {
            console.error('Failed to fetch surat detail:', error);
            toastr.error('Failed to fetch surat detail');
        }
    };

    // New function to handle the change of selected ayat surat
    const handleAyatSuratChange = (event, index) => {
        const selectedAyatSuratId = event.target.value;
        const updatedFormsData = [...formsData];
        updatedFormsData[index].selectedAyatSuratId = selectedAyatSuratId;
        setFormsData(updatedFormsData);
    };

    const addForm = () => {
        setFormCount(formCount + 1);
        setFormsData([...formsData, {
            selectedThemeId: '',
            subThemes: [],
            selectedSubThemeId: '',
            subSubThemes: [],
            selectedSubSubThemeId: '',
            selectedHadithId: '',
            selectedHadithDetail: [],
            hadithNotAvailable: false,
            quillText: '', // Inisialisasi quillText baru untuk setiap form
            referensiQuillText: '',
            hadithTambahText: '',
            surats: [],
            selectedSuratId: '',
            suratDetail: [],
            selectedAyatSuratId: '', // Add this line
        }]);
    };

    const removeForm = () => {
        if (formCount > 1) {
            setFormCount(formCount - 1);
            setFormsData(formsData.slice(0, -1));
        }
    };

    const handleSubmit = async () => {
        const formData = formsData.map(form => ({
            deskripsi: form.quillText,
            ayat_surat_id: form.selectedSuratId,
            ayat_hadith_id: form.selectedHadithId,
            subsub_theme_id: form.selectedSubSubThemeId,
            hadith_tambah: form.hadithTambahText,
            referensi: form.referensiQuillText,
            // Include selected ayat surat id in the submitted data
            // Include selected ayat surat id in the submitted data
            ayat_surat_id: form.selectedAyatSuratId,
        }));
        try {
            await storeContentTheme({ content_themes: formData });
            navigate('/contentthemes');
            toastr.success('Data berhasil dikirim!');
        } catch (error) {
            console.error('Gagal mengirim data:', error);
            toastr.error('Gagal mengirim data');
        }
    };

    return (
        <div className="w-full h-screen overflow-x-hidden border-t">
            <main className="w-full p-6">
                <h1 className="w-full text-3xl text-black pb-6">Forms Content Theme</h1>
                <div className="flex flex-wrap">
                    {[...Array(formCount)].map((_, index) => (
                        <div key={index} className="w-full lg:w-1/2 my-6 pr-0 lg:pr-2">
                            <div className="leading-loose">
                                <form key={index} className="p-10 bg-white rounded shadow-xl">
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600" htmlFor={`referensi${index}`}>Deskripsi</label>
                                        <ReactQuill
                                            className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                                            modules={{
                                                toolbar: [
                                                    [{ 'font': [] }],
                                                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                    [{ 'color': [] }, { 'background': [] }],
                                                    [{ 'script': 'sub' }, { 'script': 'super' }],
                                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                                    [{ 'align': [] }],
                                                    ['link', 'image', 'video'],
                                                    ['clean']
                                                ]
                                            }}
                                            formats={[
                                                'header', 'font', 'size',
                                                'bold', 'italic', 'underline', 'strike', 'blockquote',
                                                'color', 'background',
                                                'script', 'list', 'bullet', 'indent',
                                                'align',
                                                'link', 'image', 'video'
                                            ]}
                                            value={formsData[index].quillText}
                                            onChange={(value) => {
                                                const updatedFormsData = [...formsData];
                                                updatedFormsData[index].quillText = value;
                                                setFormsData(updatedFormsData);
                                            }}
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600" htmlFor={`themeId${index}`}>Pilih Theme</label>
                                        <select onChange={(event) => handleThemeChange(event, index)} id={`themeId${index}`} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                                            <option value="">Select Theme</option>
                                            {themes.map((theme, idx) => (
                                                <option key={idx} value={theme.id}>{theme.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600" htmlFor={`subThemeId${index}`}>Pilih Sub Theme</label>
                                        <select onChange={(event) => handleSubThemeChange(event, index)} id={`subThemeId${index}`} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                                            <option value="">Select Sub Theme</option>
                                            {formsData[index].subThemes.map((subtheme, idx) => (
                                                <option key={idx} value={subtheme.id}>{subtheme.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600" htmlFor={`subSubThemeId${index}`}>Pilih Sub Sub Theme</label>
                                        <select onChange={(event) => handleSubSubThemeChange(event, index)} id={`subSubThemeId${index}`} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                                            <option value="">Select Sub Sub Theme</option>
                                            {formsData[index].subSubThemes.map((subsubtheme, idx) => (
                                                <option key={idx} value={subsubtheme.id}>{subsubtheme.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600" htmlFor={`suratId${index}`}>Pilih Surat</label>
                                        <select onChange={(event) => handleSuratChange(event, index)} id={`suratId${index}`} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                                            <option value="">Select Surat</option>
                                            {surats.map((surat, idx) => (
                                                <option className='font-bold' key={idx} value={surat.id}>{surat.nama_latin}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600" htmlFor={`ayatSuratId${index}`}>Pilih Ayat Surat</label>
                                        <select onChange={(event) => handleAyatSuratChange(event, index)} id={`ayatSuratId${index}`} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                                            <option value="">Select Ayat Surat</option>
                                            {formsData[index].suratDetail.map((ayat, idx) => (
                                                <option className='text-2xl' key={idx} value={ayat.id}>{ayat.teks_arab}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600" htmlFor={`hadithId${index}`}>Pilih Hadith</label>
                                        <select onChange={(event) => handleHadithChange(event, index)} id={`hadithId${index}`} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                                            <option value="">Select Hadith</option>
                                            {hadiths.map((hadith, idx) => (
                                                <option key={idx} value={hadith.id}>{hadith.name_hadith}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600" htmlFor={`selectedHadithDetail${index}`}>Detail Hadis</label>
                                        <select onChange={(e) => {
                                            const updatedFormsData = [...formsData];
                                            if (e.target.value === "0") {
                                                updatedFormsData[index].hadithNotAvailable = true;
                                            } else {
                                                updatedFormsData[index].hadithNotAvailable = false;
                                            }
                                            setFormsData(updatedFormsData);
                                        }} id={`selectedHadithDetail${index}`} className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded">
                                            <option value="">Select Hadith Detail</option>
                                            {formsData[index].selectedHadithDetail.map((detail, idx) => (
                                                <option className='text-2xl' key={idx} value={detail.id}>{detail.arab}</option>
                                            ))}
                                            <option value="0">Hadith Tidak Ada</option>
                                        </select>
                                    </div>
                                    {formsData[index].hadithNotAvailable && (
                                        <div className="mt-4">
                                            <label className="block text-sm text-gray-600" htmlFor={`hadis${index}`}>Tambahan Hadis</label>
                                            <ReactQuill
                                                className="w-full px-5 py-1 text-gray-700 bg-gray-200 rounded"
                                                value={formsData[index].hadithTambahText}
                                                onChange={(value) => {
                                                    const updatedFormsData = [...formsData];
                                                    updatedFormsData[index].hadithTambahText = value;
                                                    setFormsData(updatedFormsData);
                                                }}
                                                modules={{
                                                    toolbar: [
                                                        [{ 'font': [] }],
                                                        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                        [{ 'color': [] }, { 'background': [] }],
                                                        [{ 'script': 'sub' }, { 'script': 'super' }],
                                                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                                        [{ 'align': [] }],
                                                        ['link', 'image', 'video'],
                                                        ['clean']
                                                    ]
                                                }}
                                                formats={[
                                                    'header', 'font', 'size',
                                                    'bold', 'italic', 'underline', 'strike', 'blockquote',
                                                    'color', 'background',
                                                    'script', 'list', 'bullet', 'indent',
                                                    'align',
                                                    'link', 'image', 'video'
                                                ]}
                                            />
                                        </div>
                                    )}
                                    <div className="mt-4">
                                        <label className="block text-sm text-gray-600" htmlFor={`referensi${index}`}>Referensi</label>
                                        <ReactQuill
                                            className="w-full px-5 py-2 text-gray-700 bg-gray-200 rounded"
                                            modules={{
                                                toolbar: [
                                                    [{ 'font': [] }],
                                                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                                    [{ 'color': [] }, { 'background': [] }],
                                                    [{ 'script': 'sub' }, { 'script': 'super' }],
                                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                                                    [{ 'align': [] }],
                                                    ['link', 'image', 'video'],
                                                    ['clean']
                                                ]
                                            }}
                                            formats={[
                                                'header', 'font', 'size',
                                                'bold', 'italic', 'underline', 'strike', 'blockquote',
                                                'color', 'background',
                                                'script', 'list', 'bullet', 'indent',
                                                'align',
                                                'link', 'image', 'video'
                                            ]}
                                            value={formsData[index].referensiQuillText}
                                            onChange={(value) => {
                                                const updatedFormsData = [...formsData];
                                                updatedFormsData[index].referensiQuillText = value;
                                                setFormsData(updatedFormsData);
                                            }}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between mt-6">
                    <button onClick={addForm} className="px-4 py-2 bg-blue-500 text-white rounded shadow">Tambah Form</button>
                    <button onClick={removeForm} className="px-4 py-2 bg-red-500 text-white rounded shadow">Hapus Form</button>
                    <button onClick={handleSubmit} className="px-4 py-2 bg-green-500 text-white rounded shadow">Submit</button>
                </div>
            </main>
        </div>
    );
};

export default CreateContentContentThemes;