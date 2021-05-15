import React from 'react'
import { Col, Form } from 'react-bootstrap'

const InputForm = ({
    as, 
    rows,
    label,
    type='text',
    placeholder,
    value,
    onChange,
    error
}) => {
    return (
        <Form.Group>
                <Form.Row>
                    <Form.Label column lg={2}>
                        {label}
                    </Form.Label>
                    <Col>
                        <Form.Control
                        as={as} 
                        rows={rows} 
                        type={type} 
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        isInvalid={error}
                        />
                        <Form.Control.Feedback type="invalid">
                            {error}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Row>
            </Form.Group>
    )
}

export default InputForm
