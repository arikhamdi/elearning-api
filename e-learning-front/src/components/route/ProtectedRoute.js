import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route} from 'react-router-dom';

const ProtectedRoute = ({component:Component, ...rest}) => {

    const { isAuthenticated, loading } = useSelector(state => state.auth);


    console.log('isAuthenticated', isAuthenticated)
    return (
        <Fragment>
        
        {(!loading) && (
            
            <Route 
                {...rest}
                render={props => {
                    if (!isAuthenticated) {
                        console.log('not auth')
                         return <Redirect to="/login" />
                    }
                    console.log('auth')
                    return <Component {...props} />
                }}
            />
        )}
        </Fragment>
    )
}

export default ProtectedRoute