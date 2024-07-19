import React from 'react';
import Footer from "../../components/Footer";
import ProfileSection from "../../components/Profile";
import NavbarLogin from "../../components/Navbar/NavbarLogin";
import Title from "../../components/Title";

function App() {
    return (
        <>
            <NavbarLogin  />
            <Title
                title={' Al-Qur’an Digital - Qur’an Tematik - Hadits Tematik '}
                caption={' Dikembangkan  Oleh Universitas KH Ruhiat Cipasung Kementerian Agama Republik Indonesia'}
            />

            <ProfileSection/>
            
            <Footer/>
        </>
    )
}

export default App;
