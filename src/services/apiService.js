// apiService.js
import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleError = (error) => {
  throw error.response.data.message;
};

export const getCsrfToken = async () => {
  try {
    const response = await api.get('/sanctum/csrf-cookie');
    return response.data.csrf_token;
  } catch (error) {
    handleError(error);
  }
};

export const register = async (userData, csrfToken) => {
  try {
    const response = await api.post('/register', userData, {
      headers: {
        'X-CSRF-TOKEN': csrfToken,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      throw new Error('Email is already registered.');
    } else {
      handleError(error);
    }
  }
};

export const login = async (userData) => {
  try {
      const response = await api.post('/login', userData);
      const csrfToken = response.data.csrf_token; // Assuming the CSRF token is returned in the response
      localStorage.setItem('csrf_token', csrfToken); // Store the CSRF token in local storage
      return response.data;
  } catch (error) {
      handleError(error);
  }
};


export const getSurats = async () => {
  try {
    const response = await api.get('/surats');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getSuratDetail = async (slug) => {
  try {
    const response = await api.get(`/surats/${slug}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const getSuratDetailById = async (id) => {
  try {
    const response = await api.get(`/surat/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getSuratAyat = async (slug) => {
  try {
    const response = await api.get(`/surats/${slug}/ayats`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getHadiths = async () => {
  try {
    const response = await api.get('/hadiths');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getHadithDetail = async (slug) => {
  try {
    const response = await api.get(`/hadiths/${slug}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// Function to fetch a hadith detail by its ID
export const getHadithDetailById = async (id) => {
  try {
    const response = await api.get(`/hadith/${id}`);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};



export const getTemes = async () => {
  try {
    const response = await api.get('/teme');
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const getSubTemes = async (themeId) => {
  try {
    const response = await api.get('/subteme', { params: { theme_id: themeId } });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getSubsubTemes = async (sub_theme_Id) => {
  try {
    const response = await api.get('/subsub_teme', { params: { sub_theme_id: sub_theme_Id } });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getContentContentTemes = async (subsubThemeId) => {
  try {
    const response = await api.get('/contentcontenttemes', { params: { subsub_theme_id: subsubThemeId } });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};



export const viewProfile = async () => {
  try {
    const response = await api.get('/profile-user', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const updateProfile = async (userData) => {
  try {
    const { name, password, email } = userData;
    const requestBody = {};
    if (name) requestBody.name = name;
    if (password) requestBody.password = password;
    if (email) requestBody.email = email;

    const response = await api.post('/edit-profile', requestBody, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const logout = async (csrfToken) => {
  try {
      const response = await api.post('/logout', {}, {
          headers: {
              'X-CSRF-TOKEN': csrfToken,
              'Authorization': `Bearer ${localStorage.getItem('token')}` // Include authentication token
          },
      });
      return response.data;
  } catch (error) {
      console.error('Failed to logout:', error);
      throw error;
  }
};

export const saveAyatSurat = async (ayatSuratId) => {
  try {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token'); // Ambil token autentikasi dari local storage
    const userData = {
      user_email: email,
      ayat_surat_id: ayatSuratId,
    };
    const response = await api.post('/save-ayat-surats', userData, {
      headers: {
        'Authorization': `Bearer ${token}` // Sertakan token autentikasi dalam header permintaan
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};



export const ShowResultSavedAyatSurat = async () => {
  try {
    const email = localStorage.getItem('email'); // Retrieve user's email from local storage
    const token = localStorage.getItem('token'); // Retrieve authentication token from local storage
    const response = await api.get('/saved-ayat-surats', {
      params: {
        user_email: email // Include user's email as a query parameter
      },
      headers: {
        'Authorization': `Bearer ${token}` // Include authentication token in request header
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const deleteSavedAyatSurat = async (id) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token autentikasi dari local storage
    const response = await api.delete(`/saved-ayat-surats/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Sertakan token autentikasi dalam header permintaan
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const saveAyatHadith = async (ayatHadithId) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token autentikasi dari local storage
    const response = await api.post('/save-ayat-hadiths', { ayat_hadith_id: ayatHadithId }, {
      headers: {
        'Authorization': `Bearer ${token}` // Sertakan token autentikasi dalam header permintaan
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const deleteSavedAyatHadith = async (id) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token autentikasi dari local storage
    const response = await api.delete(`/saved-ayat-hadiths/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}` // Sertakan token autentikasi dalam header permintaan
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const ShowResultSavedAyatHadith = async () => {
  try {
    const token = localStorage.getItem('token'); // Ambil token autentikasi dari local storage
    const response = await api.get('/saved-ayat-hadiths', {
      headers: {
        'Authorization': `Bearer ${token}` // Sertakan token autentikasi dalam header permintaan
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};



export const getUsers = async () => {
  try {
    const token = localStorage.getItem('token'); // Retrieve authentication token from local storage
    const response = await api.get('/users', {
      headers: {
        'Authorization': `Bearer ${token}` // Include authentication token in request header
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const storeUser = async (userData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('/users', userData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 422) {
      // Tangani kesalahan validasi
      throw new Error(error.response.data.message);
    } else {
      // Tangani kesalahan lainnya
      handleError(error);
    }
  }
};


export const destroyUser = async (userId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const editUser = async (id) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get(`/users/${id}/edit`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const updateUser = async (userData) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token autentikasi dari local storage
    const { id, name, email, password, role } = userData; // Ambil properti yang diperlukan dari userData
    const requestBody = {}; // Buat objek untuk menyimpan data yang akan diperbarui

    if (name) requestBody.name = name; // Tambahkan nama jika tersedia
    if (email) requestBody.email = email; // Tambahkan email jika tersedia
    if (password) requestBody.password = password; // Tambahkan password jika tersedia
    if (role) requestBody.role = role; // Tambahkan role jika tersedia

    const response = await api.put(`/users/${id}`, requestBody, {
      headers: {
        'Authorization': `Bearer ${token}` // Sertakan token autentikasi dalam header permintaan
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getThemes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/themes', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const destroyTheme = async (themeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/themes/${themeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const storeTheme = async (themeData) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token autentikasi dari local storage
    const response = await api.post('/themes', themeData, {
      headers: {
        'Authorization': `Bearer ${token}` // Sertakan token autentikasi dalam header permintaan
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


// apiService.js
export const editTheme = async (themeId) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token autentikasi dari local storage
    const response = await api.get(`/themes/${themeId}/edit`, {
      headers: {
        'Authorization': `Bearer ${token}` // Sertakan token autentikasi dalam header permintaan
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const updateTheme = async (themeId, themeData) => {
  try {
    const token = localStorage.getItem('token'); // Ambil token autentikasi dari local storage
    const { name, slug } = themeData; // Ambil properti yang diperlukan dari themeData
    const requestBody = {}; // Buat objek untuk menyimpan data yang akan diperbarui

    if (name) requestBody.name = name; // Tambahkan nama jika tersedia
    if (slug) requestBody.slug = slug; // Tambahkan slug jika tersedia

    const response = await api.put(`/themes/${themeId}`, requestBody, {
      headers: {
        'Authorization': `Bearer ${token}` // Sertakan token autentikasi dalam header permintaan
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


// Menambahkan fungsi untuk mendapatkan subtema berdasarkan tema_id
export const getSubThemes = async (themeId = '') => {
  try {
    const token = localStorage.getItem('token'); // Ambil token autentikasi dari local storage
    const response = await api.get('/subthemes', {
      params: {
        theme_id: themeId,
      },
      headers: {
        'Authorization': `Bearer ${token}` // Sertakan token autentikasi dalam header permintaan
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const storeSubThemes = async (subThemesData) => {
  try {
      const token = localStorage.getItem('token');
      const response = await api.post('/subthemes', { subthemes: subThemesData }, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      handleError(error);
  }
};


export const destroySubTheme = async (subthemeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/subthemes/${subthemeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const editSubTheme = async (subThemeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get(`/subthemes/${subThemeId}/edit`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const updateSubTheme = async (subThemeId, subThemeData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.put(`/subthemes/${subThemeId}`, subThemeData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const getSubsubThemes = async (subThemeId = '') => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/subsub_themes', {
      params: {
        sub_theme_id: subThemeId,
      },
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const destroySubsubTheme = async (subsubThemeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/subsub_themes/${subsubThemeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const storeSubsubTheme = async (subsubThemesData) => {
  try {
      const token = localStorage.getItem('token');
      const response = await api.post('/subsub_themes', { subsub_themes: subsubThemesData }, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });
      return response.data;
  } catch (error) {
      handleError(error);
  }
};


export const editSubsubTheme = async (subsubThemeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get(`/subsub_themes/${subsubThemeId}/edit`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const updateSubsubTheme = async (subsubThemeId, subsubThemeData) => {
  try {
    const token = localStorage.getItem('token');

    // Pastikan sub_theme_id ada dalam subsubThemeData sebelum mengirimkan permintaan pembaruan
    if (!subsubThemeData.hasOwnProperty('sub_theme_id')) {
      // Lakukan sesuatu jika sub_theme_id tidak ada dalam data (misalnya, lemparkan kesalahan atau tambahkan sub_theme_id ke dalam data)
      throw new Error('sub_theme_id is required.'); // Atau Anda dapat menambahkan sub_theme_id ke dalam data jika diperlukan
    }

    const response = await api.put(`/subsub_themes/${subsubThemeId}`, subsubThemeData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const getContentThemes = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get('/content_themes', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const destroyContentTheme = async (contentThemeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.delete(`/content_themes/${contentThemeId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const storeContentTheme = async (contentThemeData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.post('/content_themes', contentThemeData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const editContentTheme = async (contentThemeId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.get(`/content_themes/${contentThemeId}/edit`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      // Handle case where content theme is not found
      throw new Error('Content Theme not found');
    } else {
      // Handle other errors
      handleError(error);
    }
  }
};


export const updateContentTheme = async (contentThemeId, contentThemeData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await api.put(`/content_themes/${contentThemeId}`, contentThemeData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

// export const getContentContentThemes = async () => {
//   try {
//     const response = await api.get('/contentcontentthemes');
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };

