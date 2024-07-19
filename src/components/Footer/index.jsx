import styles from './Footer.module.css'

const Footer = () => {
    return (
        <div className={styles.contentFooter}>
            <footer className={`${styles.footer} text-center`}>
            Copyright 2024 - All Rights Reserved - DIGCIP
            </footer>
        </div>
    )
}

export default Footer;