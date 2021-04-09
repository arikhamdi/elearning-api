import Courses from './components/courses/Courses';

import Login from './components/users/login/Login';
import Signup from './components/users/signup/Signup';
import Dashboard from './components/users/dashboard/Dashboard';

import requireAuth from "./utils/RequireAuth";

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Root from "./Root";
import {Route, Switch } from 'react-router-dom';
import { Container } from "react-bootstrap";

import {Provider} from './context';




function App() {
  return (
    <Provider>
    <Root>
    <div className="App">
    <Header />
    <Container>
        <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/subject/:subject" component={Courses} />
            <Route path='/user/dashboard' component={requireAuth(Dashboard)} />
            <Route path='/user/login' component={Login} />
            <Route path='/user/signup' component={Signup} />
        </Switch>
    </Container>
      <Footer />
    </div>
    
</Root>
    </Provider>
  );
}

export default App;
