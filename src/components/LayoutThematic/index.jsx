import PropTypes from 'prop-types';
import styles from './LayoutQuran.module.css'

const Layout = ({children}) => {
    return (
        <div class={`${styles.infoKitab} justify-center px-4 py-4 `}>
            {children}
        </div>
   
    )
}

Layout.propTypes = {
    children: PropTypes.node
}

export default Layout;