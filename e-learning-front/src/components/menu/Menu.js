import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import StudentMenu from './StudentMenu';
import MainMenu from './MainMenu';
import { history } from '../../store';
import TeacherMenu from './TeacherMenu';


const Menu = () => {

    
    switch(history.location.pathname.split("/")[1]) {
        case 'student':
            return (
                <Fragment>
                    <StudentMenu />
                </Fragment>
                
            )
        case 'teacher':
            return (
                <Fragment>
                    <TeacherMenu />
                </Fragment>
                
            )
        default:
            return (
                <Fragment>
                    <MainMenu />
                </Fragment>
                
            )

    }            

}

export default withRouter(Menu);