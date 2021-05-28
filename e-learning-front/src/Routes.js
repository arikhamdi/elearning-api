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
import TeacherCreateContentText from './components/user/teacher/TeacherCreateContentText';
import TeacherCreateContentImage from './components/user/teacher/TeacherCreateContentImage';
import TeacherCreateContentVideo from './components/user/teacher/TeacherCreateContentVideo';
import TeacherCreateContentFile from './components/user/teacher/TeacherCreateContentFile';
import TeacherEditCourseOverview from './components/user/teacher/TeacherEditCourseOverview';
import TeacherEditContentText from './components/user/teacher/TeacherEditContentText';
import TeacherEditContentImage from './components/user/teacher/TeacherEditContentImage';
import TeacherEditContentVideo from './components/user/teacher/TeacherEditContentVideo';
import TeacherEditContentFile from './components/user/teacher/TeacherEditContentFile';
import Search from './components/pages/Search';
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
                <ProtectedTeacherRoute exact path='/teacher/course/module/:slug/:moduleId/content/text' component={TeacherCreateContentText} />
                <ProtectedTeacherRoute exact path='/teacher/course/module/:slug/:moduleId/content/image' component={TeacherCreateContentImage} />
                <ProtectedTeacherRoute exact path='/teacher/course/module/:slug/:moduleId/content/video' component={TeacherCreateContentVideo} />
                <ProtectedTeacherRoute exact path='/teacher/course/module/:slug/:moduleId/content/file' component={TeacherCreateContentFile} />
                <ProtectedTeacherRoute exact path='/teacher/course/:slug/edit' component={TeacherEditeCourse} />
                <ProtectedTeacherRoute exact path='/teacher/course/:slug/edit/overview' component={TeacherEditCourseOverview} />
                <ProtectedTeacherRoute exact path='/teacher/course/:slug/module/new' component={TeacherAddModule} />
                <ProtectedTeacherRoute exact path='/teacher/course/:slug/:module/edit' component={TeacherEditModule} />
                <ProtectedTeacherRoute exact path='/teacher/course/module/:slug/:moduleId/content/:contentId/text/edit' component={TeacherEditContentText} />
                <ProtectedTeacherRoute exact path='/teacher/course/module/:slug/:moduleId/content/:contentId/image/edit' component={TeacherEditContentImage} />
                <ProtectedTeacherRoute exact path='/teacher/course/module/:slug/:moduleId/content/:contentId/video/edit' component={TeacherEditContentVideo} />
                <ProtectedTeacherRoute exact path='/teacher/course/module/:slug/:moduleId/content/:contentId/file/edit' component={TeacherEditContentFile} />
                <ProtectedTeacherRoute path='/teacher/course' component={TeacherDashboard} />
                <ProtectedStudentRoute path="/student/:slug" component={StudentCourse} />
                <ProtectedStudentRoute path="/student/:slug/:content" component={StudentCourse} />
                <ProtectedRoute exact path="/profile" component={UserPersonalInfos} />
                <ProtectedRoute path="/profile/auth" component={PasswordChange} />
                <ProtectedRoute exact path="/dashboard" component={Dashboard} />
                <ProtectedRoute exact path="/subscribe-confirm" component={SubscribeConfirm} />
                <Route path="/search" component={Search} /> 
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