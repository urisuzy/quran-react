import styles from './Menu.module.css';
import PropTypes from 'prop-types';

const Menu = ({ title, caption, imageCard, colorCard, urlMenu, useHTML }) => {
    return (
        <div className={`${styles.cardKitab} rounded overflow-hidden shadow-lg py-6 px-4`} style={{ backgroundColor: colorCard }}>
            <div className="flex flex-row justify-between items-center mb-6">
                <div className="px-6 py-4 items-center">
                    <div className="font-bold mb-2">
                        {
                            useHTML ? (
                                <div dangerouslySetInnerHTML={{ __html: title }} className={`${styles.contentTitle} font-bold text-white`}/>

                              
                            ) : (
                                <h6 className={`${styles.contentTitle} font-bold text-white`}>
                                {title}
                            </h6>
                            )
                        }
                      
                    </div>
                    <p className={`${styles.contentCaption} text-white text-base`}>
                        {caption}
                    </p>
                </div>
                <div className="items-center">
                    <img className="w-20" src={imageCard} alt="img-alquran" />
                </div>
            </div>
            <div className="px-4">
                <hr className="border-t border-white" />
            </div>
            <div className="masuk-btn py-4 px-4">
                <button onClick={urlMenu} className={`${styles.btnMasuk} w-full btn px-4 py-4`}>
                    Masuk
                </button>
            </div>
        </div>
    );
};

Menu.propTypes = {
    title: PropTypes.string,
    caption: PropTypes.string,
    imageCard: PropTypes.string,
    colorCard: PropTypes.string,
    urlMenu: PropTypes.any,
};

export default Menu;
