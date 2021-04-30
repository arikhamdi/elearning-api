import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordConfirm } from '../../../store/user/profile';

import '../../pages/Page.css';

const PasswordResetConfirm = ({match, history}) => {

    const { error, isUpdated } = useSelector(state => state.auth.profile);

    const [errors, setErrors] = useState({});

    const [password, setPassword] = useState('');

    const {token} = match.params;


    useEffect(() => {
        if (error) {
            setErrors({...error});
        }
        
        if (isUpdated){
            history.push('/password-reset/success');
            setTimeout(() => history.push('/login'), 5000);
        }

    },[error, isUpdated])

    const dispatch = useDispatch();

    const handleChange = e => {
        setPassword(e);
        setErrors({});
    }

    const submitNewPassword = e => {
        e.preventDefault();

        dispatch(resetPasswordConfirm({password, token})) 

    }
    
    const passwordChangeForm = () => (
        <Form noValidate className="w-50" onSubmit={submitNewPassword}>
         <Form.Group>
             <Form.Control 
                 type="password"
                 required 
                 size="lg" 
                 placeholder="Entrer votre nouveau mot de passe..."
                 value={password}
                 isInvalid={errors?.password}
                 onChange={(e) => handleChange(e.target.value)}
             />
             <Form.Control.Feedback type="invalid">
                {errors?.password}
            </Form.Control.Feedback>
         </Form.Group>
         <hr />
         <Form.Group className="text-center">
         <Button variant="info" className="w-50 mt-5" type="submit">Modifier mot de passe</Button>
         </Form.Group>
        </Form>

 )
    

    return (
        <div>
            <div className="not-found" style={{ height: '60vh'}}>
            <h1 className="display-4"><span className="text-danger">Reinitialiser</span> votre mot de passe</h1>
            {passwordChangeForm()}
            </div>
        </div>
    )
}

export default PasswordResetConfirm
