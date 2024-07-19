import React from 'react';
import ReactDOM from 'react-dom';



import 
  {
    BrowserRouter as Router,

    Routes,
    Route
  } 
from 'react-router-dom'

import './index.css';
import Landing from './pages/landing';
import ReadQuran from './pages/digital';
import Login from './pages/login';
import Register from './pages/register';
import AyatQuran from './pages/digital/ayat-quran'
import HaditsPerawi from './pages/hadits';
import ListHadis from './pages/hadits/list-hadits';
import ProfilePage from './pages/profile';
import SaveAyatSurat from './pages/save-ayat';
import SaveAyatHadith from './pages/save-hadits/';

import ThematicPage from './pages/thematic';


import DashboardAdminPage from './pages/dashboard/dashboard';

import UserAdminPage from './pages/dashboard/user';
import CreateUserAdminPage from './pages/dashboard/user/create';
import EditUserAdminPage from './pages/dashboard/user/edit';

import ThemeAdminPage from './pages/dashboard/theme';
import CreateThemeAdminPage from './pages/dashboard/theme/create';
import EditThemeAdminPage from './pages/dashboard/theme/edit';

import SubThemeAdminPage from './pages/dashboard/subtheme';
import CreateSubThemeAdminPage from './pages/dashboard/subtheme/create';
import EditSubThemeAdminPage from './pages/dashboard/subtheme/edit';

import SubsubThemeAdminPage from './pages/dashboard/subsubtheme';
import CreateSubsubThemeAdminPage from './pages/dashboard/subsubtheme/create';
import EditSubsubThemeAdminPage from './pages/dashboard/subsubtheme/edit';

import ContentThemeAdminPage from './pages/dashboard/contenttheme';
import CreateContentThemeAdminPage from './pages/dashboard/contenttheme/create';
import EditContentThemeAdminPage from './pages/dashboard/contenttheme/edit';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/surats" element={<ReadQuran />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/profile" element={<ProfilePage/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/surats/:slug" element={<AyatQuran />} />
        <Route path="/hadiths" element={<HaditsPerawi />} />
        <Route path="/hadiths/:slug" element={<ListHadis />} />
        <Route path="/save-surat" element={<SaveAyatSurat />} />  
        <Route path="/save-hadith" element={<SaveAyatHadith />} />
        <Route path="/dashboard-admin" element={<DashboardAdminPage />} />

        <Route path="/users" element={<UserAdminPage />} />
        <Route path="/users/create" element={<CreateUserAdminPage />} />
        <Route path="/users/:id/edit" element={<EditUserAdminPage />} />

        <Route path="/themes" element={<ThemeAdminPage />} />
        <Route path="/themes/create" element={<CreateThemeAdminPage />} />
        <Route path="/themes/:id/edit" element={<EditThemeAdminPage />} />

        <Route path="/subthemes" element={<SubThemeAdminPage />} />   
        <Route path="/subthemes/create" element={<CreateSubThemeAdminPage />} />
        <Route path="/subthemes/:id/edit" element={<EditSubThemeAdminPage />} />

        <Route path="/subsubthemes" element={<SubsubThemeAdminPage />} />
        <Route path="/subsubthemes/create" element={<CreateSubsubThemeAdminPage />} />
        <Route path="/subsubthemes/:id/edit" element={<EditSubsubThemeAdminPage />} />

        <Route path="/contentthemes" element={<ContentThemeAdminPage />} />
        <Route path="/contentthemes/create" element={<CreateContentThemeAdminPage />} />
        <Route path="/contentthemes/:id/edit" element={<EditContentThemeAdminPage />} />


        <Route path="/thematics" element={<ThematicPage />} />

      </Routes>
    </Router>


  </React.StrictMode>,
  document.getElementById('root')
);
