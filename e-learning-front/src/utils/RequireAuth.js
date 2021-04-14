import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router';

const RequireAuth = ({component: Component, ...rest}) => {

    const { isAuthenticated, user, loading } = useSelector(state => state.auth);


    return (
        <Fragment>
        {loading === false && (
            <Route 
                {...rest}
                render={props => {
                    if (isAuthenticated === false) {
                        <Redirect to="/sigin" />
                    }
                    return <component {...props} />
                }}
            />
        )}
        </Fragment>
    )
}

export default RequireAuth
