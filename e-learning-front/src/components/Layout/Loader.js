import React from 'react'
import { Spinner } from 'react-bootstrap'

import '../../Styles.css';

export const Loader = () => {
    return (
        <div className="loader text-center">
            <Spinner className="spinner" animation="border" style={{width: '10rem', height: '10rem'}}variant="info" />
        </div>
    )
}
