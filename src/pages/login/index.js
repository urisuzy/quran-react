import Footer from "../../components/Footer"
import Form from "../../components/Form"
import NavbarLogin from "../../components/Navbar/NavbarLogin"
import Title from "../../components/Title"


function App() {

    return (
        <>
            <NavbarLogin/>
            <Title
                title={' Al-Qur’an Digital - Qur’an Tematik - Hadits Tematik '}
                caption={' Dikembangkan  Oleh Universitas KH Ruhiat Cipasung Kementerian Agama Republik Indonesia'}
            />

            <Form
                isRegister={false}      
            />

            <Footer/>
        
        </>
    )
}

export default App;