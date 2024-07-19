import PropTypes from 'prop-types';

const LayoutMenu = ({children}) => {
    return (
        <div class="content-card container mx-auto flex flex-row justify-center">
            <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
                {children}
            </div>
        </div>
    )
}

LayoutMenu.propTypes = {
    children: PropTypes.node
}

export default LayoutMenu;