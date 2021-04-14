import Login from './components/users/login/Login';
import Signup from './components/users/signup/Signup';
import Dashboard from './components/users/dashboard/Dashboard';

import requireAuth from "./utils/RequireAuth";

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import {Route, Switch } from 'react-router-dom';
import { Container } from "react-bootstrap";

import FollowCourse from './components/users/student/FollowCourse';
import NotFound from './components/pages/NotFound';
import Forbidden from './components/pages/Forbidden';

import Root from "./Root";
import SingleCourse from './components/courses/SingleCourse';
import Home from './components/layout/Home';
import CourseDetails from './components/courses/CourseDetails';


function App() {
  return (
    <div className="App">
    <Root>
    <Header />
    <Container>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/subject/:subject" component={Home} />
            <Route path="/course/:slug" component={CourseDetails} />
            <Route path="/student/:slug" component={requireAuth(FollowCourse)} />
            <Route path='/user/dashboard' component={requireAuth(Dashboard)} />
            <Route path='/user/login' component={Login} />
            <Route path='/user/signup' component={Signup} />
            <Route path='/forbidden' component={Forbidden} />
            <Route component={NotFound} />
        </Switch>
    </Container>
    <Footer />
    </Root>
    </div>
    
  );
}

export default App;
