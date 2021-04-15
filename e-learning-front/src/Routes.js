import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Menu from './components/Layout/Menu';
import Dashboard from './components/user/Dashboard';
import CourseDetails from './components/course/CourseDetails';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import Profile from './components/user/Profile';
import store from './store';
import { isEmpty } from './utils/Utils';
import { setCurrentUser, setToken } from './reducers/user/UserActions';

import Footer from './components/Layout/Footer';
import ProtectedRoute from './components/route/ProtectedRoute';
import Forbidden from './components/pages/Forbidden';
import NotFound from './components/pages/NotFound';
import PasswordReset from './components/user/PasswordReset';
import UserPersonalInfos from './components/user/UserPersonalInfos';
import PasswordChange from './components/user/PasswordChange';


const Routes = () => {

    if (!isEmpty(localStorage.getItem("token"))) {
        store.dispatch(setToken(localStorage.getItem("token")));
    }
    if (!isEmpty(localStorage.getItem("user"))) {
        const user = JSON.parse(localStorage.getItem("user"));
        store.dispatch(setCurrentUser(user, ""));
    }


    return (
        <Router>
        <Menu />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/subject/:subject" component={Home} />
                <Route path="/course/:slug" component={CourseDetails} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/reset-password" component={PasswordReset} />
                {/* <ProtectedRoute exact path="/profile" component={Profile} /> */}
                <ProtectedRoute exact path="/profile" component={UserPersonalInfos} />
                <ProtectedRoute path="/profile/auth" component={PasswordChange} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <Route path='/forbidden' component={Forbidden} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default Routes;