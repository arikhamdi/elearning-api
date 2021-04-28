import React from 'react'
import { Spinner } from 'react-bootstrap'

import '../../Styles.css';

export const Loader = () => {
    return (
        <div className="loader text-center" style={{ overflow: 'none'}}>
            <Spinner className="spinner" animation="border" style={{width: '10rem', height: '10rem'}} variant="dark" />
        </div>
    )
}
