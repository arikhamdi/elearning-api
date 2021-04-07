import React from 'react';
import PropTypes from 'prop-types';


const TextInputGroup = ({
    type,
    name,
    label,
    value,
    onChange,
    required
}) => {
    return (
        <div className="user-sign-form-control">
        <input type={type}
                name={name}
                value={value} 
                onChange={onChange} 
                required={required} 
                            />
            <label>{label}</label>
            
        </div>
    );
};

TextInputGroup.propTypes = {
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,   
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}

export default TextInputGroup;