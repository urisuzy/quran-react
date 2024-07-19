import PropTypes from 'prop-types';
import styles from './Title.module.css'

const Title = ({title, caption, useHTML}) => {
    return (
        <div className={styles.contentTitle}>
            <div className="container mx-auto flex flex-col items-center">
                <div className="text-center">
                    <h4 className={styles.titleText}>
                        {title}
                    </h4>
                    {
                        // untuk set ada html nya dalam text
                        useHTML ? (
                            <div dangerouslySetInnerHTML={{ __html: caption }} />
                        ) : (
                            <p className={styles.captionText}>
                                {caption}
                            </p>
                        )

                    }
                   
                </div>

            </div>
        </div>
    )
}

Title.propTypes = {
    title : PropTypes.string,
    caption : PropTypes.string,
}

export default Title;