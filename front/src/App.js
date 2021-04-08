import Courses from './components/courses/Courses';

import LogIn from './components/users/LogIn';
import SignUp from './components/users/SignUp';

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
          <Route path='/user/login' component={LogIn} />
          <Route path='/user/signup' component={SignUp} />
      </Switch>
    </Root>
    </Container>
      <Footer />
    </div>
    

    </Provider>
  );
}

export default App;
