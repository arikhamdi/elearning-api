import React, { Fragment} from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route} from 'react-router-dom';
import { isEmpty } from '../utils/Utils';



const ProtectedRoute = ({component:Component, ...rest}) => {

    return (
        <Fragment>
            <Route 
                {...rest}
                render={props => {
                    if (isEmpty(localStorage.getItem("token"))) {
                        const redirectAfterLogin = rest.location.pathname;
                            return <Redirect to={`/login?next=${redirectAfterLogin}`} />
                    }
                    return <Component {...props} />
                }}
            />
        </Fragment>
    )
}

export default ProtectedRoute