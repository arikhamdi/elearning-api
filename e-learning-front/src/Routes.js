import React, { useEffect }  from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Menu from './components/menu/Menu';
import Dashboard from './components/user/Dashboard';
import CourseDetails from './components/course/CourseDetails';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import Footer from './components/Footer';
import ProtectedRoute from './routes/ProtectedRoute';
import Forbidden from './components/pages/Forbidden';
import NotFound from './components/pages/NotFound';
import PasswordReset from './components/user/password/PasswordReset';
import PasswordResetConfirm from './components/user/password/PasswordResetConfirm';
import UserPersonalInfos from './components/user/UserPersonalInfos';
import PasswordChange from './components/user/password/PasswordChange';
import PasswordResetSuccess from './components/user/password/PasswordResetSuccess';
import StudentCourse from './components/user/student/StudentCourse';
import ProtectedStudentRoute from './routes/ProtectedStudentRoute';
import { loadSubjects } from './store/subject/list';
import registrationSuccess from './components/pages/registrationSuccess';
import Favoris from './components/user/Favoris';
import { ConnectedRouter } from "connected-react-router";
import { Provider } from 'react-redux';
import store, {history} from './store';
import Subscribe from './components/user/Subscribe';
import SubscribeConfirm from './components/user/SubscribeConfirm';

import 'bootstrap/dist/css/bootstrap.min.css';

import { API } from './config';
import axios from 'axios';
import TeacherDashboard from './components/user/teacher/TeacherDashboard';
import ProtectedTeacherRoute from './routes/ProtectedTeacherRoute';
import TeacherCreateNewCourse from './components/user/teacher/TeacherCreateNewCourse';
import TeacherEditeCourse from './components/user/teacher/TeacherEditeCourse';
import TeacherAddModule from './components/user/teacher/TeacherAddModule';
import TeacherEditModule from './components/user/teacher/TeacherEditModule';
import TeacherCreateContent from './components/user/teacher/TeacherCreateContent';
axios.defaults.baseURL = API;

const Routes = () => {


    useEffect(() => {
        // Load subjects to feed all menus
        store.dispatch(loadSubjects()); 
    }, [])


    return (
        <Provider store={store}>
        <ConnectedRouter history={history}>
        <Router >
        <Menu />
            <Switch>
                <Route path="/subject/:subject" component={Home} />
                <Route exact path="/course/:slug" component={CourseDetails} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Signup} />
                <Route exact path="/password-reset" component={PasswordReset} />
                <Route path="/password-reset/confirm/:token" component={PasswordResetConfirm} />
                <Route exact path="/password-reset/success" component={PasswordResetSuccess} />
                <Route exact path="/favoris" component={Favoris} />
                <Route exact path="/subscribe" component={Subscribe} />
                <Route exact path='/registration-success' component={registrationSuccess}/>
                <Route exact path='/forbidden' component={Forbidden} />
                <ProtectedTeacherRoute exact path='/teacher/course/new' component={TeacherCreateNewCourse} />
                <ProtectedTeacherRoute exact path='/teacher/course/module/:moduleId/content/:modelName' component={TeacherCreateContent} />
                <ProtectedTeacherRoute exact path='/teacher/course/:slug/edit' component={TeacherEditeCourse} />
                <ProtectedTeacherRoute exact path='/teacher/course/:slug/module/new' component={TeacherAddModule} />
                <ProtectedTeacherRoute exact path='/teacher/course/:slug/:module/edit' component={TeacherEditModule} />
                <ProtectedTeacherRoute path='/teacher/course' component={TeacherDashboard} />
                <ProtectedStudentRoute path="/student/:slug" component={StudentCourse} />
                <ProtectedStudentRoute path="/student/:slug/:content" component={StudentCourse} />
                <ProtectedRoute exact path="/profile" component={UserPersonalInfos} />
                <ProtectedRoute path="/profile/auth" component={PasswordChange} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute exact path="/subscribe-confirm" component={SubscribeConfirm} />
                <Route path="/" component={Home} /> 
                <Route path='*' exact component={NotFound} />
            </Switch>
            <Footer />
        </Router>
        </ConnectedRouter>
      
      </Provider>
    );
};

export default Routes;