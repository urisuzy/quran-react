// App.jsx
import LayoutMenu from "../../components/LayoutMenu";
import NavbarLogin from "../../components/Navbar/NavbarLogin";
import Title from "../../components/Title";
import Menu from '../../components/Menu';
import imageQuran from '../../assets/images/quran.png';
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();

    function handleMenuClick(url){
        navigate(url);
    }

    return (
        <>
            <NavbarLogin
                openLogin={() => handleMenuClick('/login')}
            />
            <Title
                title={' Al-Qur’an Digital - Al-Qur’an Tematik - Hadits Tematik '}
                caption={' Dikembangkan  Oleh Universitas KH Ruhiat Cipasung Kementerian Agama Republik Indonesia'}
            />
            <LayoutMenu>
                <Menu
                    colorCard={`#a79191`}
                    title={'Al-Qur`an<br/>Digital'}
                    useHTML={true}
                    caption={`Al Quran 30 Juz`}
                    imageCard={imageQuran}
                    urlMenu={() => handleMenuClick(`/surats`)} // Menggunakan sebuah fungsi sebagai onClick handler
                />
                <Menu
                    colorCard={`#4bc8d0`}
                    title={'Al-Qur`an Tematik'}
                    caption={'Al Qur`an Tematik'}
                    imageCard={imageQuran}

                    urlMenu={() => handleMenuClick(`/thematics`)} 
                />
                <Menu
                    colorCard={`#cccccc`}
                    title={'Hadits<br/>Tematik'}
                    useHTML={true}
                    caption={`Hadits Tematik`}
                    imageCard={imageQuran}
                    urlMenu={() => handleMenuClick(`/hadiths`)}
                />
            </LayoutMenu>
            <Footer/>
        </>
    );
}

export default App;
