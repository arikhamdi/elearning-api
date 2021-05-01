import React, { Fragment, useEffect, useState} from 'react'
import { useSelector, useStore } from 'react-redux';
import { Redirect, Route, useHistory} from 'react-router-dom';
import { isEmpty } from '../utils/Utils';



const ProtectedStudentRoute = ({component:Component, ...rest}) => {

    const slug = rest.computedMatch.params.slug;
    const { favorisItems } = useSelector(state => state.auth.favoris);
    const { isAuthenticated ,isSubscribed } = useSelector(state => state.auth.auth);

    // Check If an Object Property Value Exists in a JavaScript Array of Objects
    const access = favorisItems.some(fav => fav.slug === slug);

    return (
        <Fragment>
            <Route 
                {...rest}
                render={props => {
                    if (!isAuthenticated) {
                            return <Redirect to="/login" />
                    }
                    else if (!access) {
                        return <Redirect to={`/course/${slug}`} />
                    } 
                    else if (!isSubscribed) {
                        return <Redirect to={`/course/${slug}`} />
                    }
                    else {
                        return <Component {...props} />
                    }
                    
                }}
            />
        </Fragment>
    )
}

export default ProtectedStudentRoute