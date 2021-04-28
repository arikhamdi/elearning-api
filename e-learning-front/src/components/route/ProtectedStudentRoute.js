import React, { Fragment, useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { Redirect, Route, useHistory} from 'react-router-dom';
import { isEmpty } from '../../utils/Utils';



const ProtectedStudentRoute = ({component:Component, ...rest}) => {

    const slug = rest.computedMatch.params.slug;
    console.log(rest)

    const access = JSON.parse(localStorage.getItem("subscribed")).includes(slug);

    return (
        <Fragment>
            <Route 
                {...rest}
                render={props => {
                    if (isEmpty(localStorage.getItem("token"))) {
                            return <Redirect to="/login" />
                    } 
                    else if (!access) {
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