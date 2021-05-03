import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';

const ProtectedTeacherRoute = ({component:Component, ...rest}) => {
    const { isAuthenticated, isTeacher } = useSelector(state => state.auth.auth);
    return (
        <Fragment>
        <Route 
            {...rest}
            render={props => {
                if (!isAuthenticated) {
                            return <Redirect to="/login" />
                    }
                    else if (!isTeacher) {
                        return <Redirect to={`/`} />
                    } 
                    else {
                        return <Component {...props} />
                    }
            }}
        />
            
        </Fragment>
    )
}

export default ProtectedTeacherRoute
