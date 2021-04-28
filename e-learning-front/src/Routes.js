import React, { useEffect }  from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Menu from './components/Layout/Menu';
import Dashboard from './components/user/Dashboard';
import CourseDetails from './components/course/CourseDetails';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import { isEmpty } from './utils/Utils';
import { setCurrentUser, setToken } from './reducers/user/UserActions';

import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/route/ProtectedRoute';
import Forbidden from './components/pages/Forbidden';
import NotFound from './components/pages/NotFound';
import PasswordReset from './components/user/password/PasswordReset';
import PasswordResetConfirm from './components/user/password/PasswordResetConfirm';
import UserPersonalInfos from './components/user/UserPersonalInfos';
import PasswordChange from './components/user/password/PasswordChange';
import PasswordResetSuccess from './components/user/password/PasswordResetSuccess';
import StudentCourse from './components/user/student/StudentCourse';
import ProtectedStudentRoute from './components/route/ProtectedStudentRoute';

import { useDispatch } from 'react-redux';
import { loadSubjects } from './store/subject/list';


const Routes = () => {

    

    const dispatch = useDispatch();

    if (!isEmpty(localStorage.getItem("token"))) {
        dispatch(setToken(localStorage.getItem("token")));
    }
    if (!isEmpty(localStorage.getItem("user"))) {
        const user = JSON.parse(localStorage.getItem("user"));
        dispatch(setCurrentUser(user, ""));
    }

    // Load subjects to feed all menus

    useEffect(() => {
        dispatch(loadSubjects());
    }, [dispatch])



    return (
        <Router >
        <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/subject/:subject" component={Home} />
                <Route exact path="/course/:slug" component={CourseDetails} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/password-reset" component={PasswordReset} />
                <Route path="/password-reset/confirm/:token" component={PasswordResetConfirm} />
                <Route exact path="/password-reset/success" component={PasswordResetSuccess} />
                <ProtectedStudentRoute exact path="/student/:slug" component={StudentCourse} />
                <ProtectedStudentRoute path="/student/:slug/:content" component={StudentCourse} />
                <ProtectedRoute exact path="/profile" component={UserPersonalInfos} />
                <ProtectedRoute path="/profile/auth" component={PasswordChange} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <Route path='/forbidden' component={Forbidden} />
                <Route path='*' exact component={NotFound} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default Routes;