import Courses from './components/courses/Courses';

import Login from './components/users/login/Login';
import Signup from './components/users/signup/Signup';
import Dashboard from './components/users/Dashboard';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import Root from "./Root";
import {Route, Switch } from 'react-router-dom';
import { Container } from "react-bootstrap";

import {Provider} from './context';




function App() {
  return (
    <Provider>
    
    <div className="App">
    <Header />
    <Container>
      <Root>
        <Switch>
            <Route exact path="/" component={Courses} />
            <Route path="/subject/:subject" component={Courses} />
            <Route path='/user/dashboard' component={Dashboard} />
            <Route path='/user/login' component={Login} />
            <Route path='/user/signup' component={Signup} />
        </Switch>
      </Root>
    </Container>
      <Footer />
    </div>
    

    </Provider>
  );
}

export default App;
