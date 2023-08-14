import PropTypes from 'prop-types';
import './../../styles/main.css'

function Button ({children, className, ...props}){

    const defaultClasses = 'rounded-lg bg-blue-700 py-2 px-3'
    const addedClasses = `${defaultClasses} ${className}`

    return (
        <>
            <button className={addedClasses} {...props}>{children}</button>
        </>
    )
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
};
Button.defaultProps = {
    className: ''
};

export default Button;