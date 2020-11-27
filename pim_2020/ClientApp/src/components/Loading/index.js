import React from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default function Loading({ isLoading }) {
    if (!isLoading) return <></>;

    return (
        <div className="container">
            <div></div>
            <span>Carregando...</span>
        </div>
        );
}


Loading.defaultProps = {
    isLoading: false,
};

Loading.propTypes = {
    isLoading: PropTypes.bool,
};