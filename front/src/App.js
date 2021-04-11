import Courses from './components/courses/Courses';

import Login from './components/users/login/Login';
import Signup from './components/users/signup/Signup';
import Dashboard from './components/users/dashboard/Dashboard';

import requireAuth from "./utils/RequireAuth";

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import {Route, Switch } from 'react-router-dom';
import { Container } from "react-bootstrap";

import Course from './components/courses/Course';
import FollowCourse from './components/users/student/FollowCourse';
import NotFound from './components/pages/NotFound';


function App() {
  return (
    <div className="App">
    <Header />
    <Container>
        <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/subject/:subject" component={Courses} />
            <Route path="/course/:slug" component={Course} />
            <Route path="/student/:slug" component={FollowCourse} />
            <Route path='/user/dashboard' component={requireAuth(Dashboard)} />
            <Route path='/user/login' component={Login} />
            <Route path='/user/signup' component={Signup} />
            <Route component={NotFound} />
        </Switch>
    </Container>
    <Footer />
    </div>
  );
}

export default App;
