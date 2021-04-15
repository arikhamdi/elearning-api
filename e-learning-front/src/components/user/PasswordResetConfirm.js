import React, { useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordConfirm } from '../../reducers/user/UserActions';

import '../pages/Page.css';

const PasswordResetConfirm = ({match, history}) => {

    const { error, isUpdated } = useSelector(state => state.profile);

    const [validated, setValidated] = useState(false);

    const [password, setPassword] = useState('');

    const {token} = match.params;


    useEffect(() => {
        if (isUpdated){
            history.push('/password-reset/success');
            setTimeout(() => history.push('/login'), 5000);
        }

    },[error, isUpdated])

    const dispatch = useDispatch();

    const submitNewPassword = e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
        }

        setValidated(true);
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
                 isInvalid={error && error.password}
                 onChange={(e) => setPassword(e.target.value)}
             />
             <Form.Control.Feedback type="invalid">
                {error && error.password}
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
