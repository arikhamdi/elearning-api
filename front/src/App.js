import Courses from './components/courses/Courses';

import LogIn from './components/users/LogIn';
import SignUp from './components/users/SignUp';

import Header from './components/layout/Header';


import Footer from './components/layout/Footer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container } from "react-bootstrap";

import {Provider} from './context';




function App() {
  return (
    <Provider>
    <Router>
    <div className="App">
    <Header />
    <Container>
        <Route exact path="/" component={Courses} />
        <Route path="/subject/:subject" component={Courses} />
        <Route path='/user/login' component={LogIn} />
        <Route path='/user/signup' component={SignUp} />
    </Container>
      <Footer />
    </div>
    </Router>

    </Provider>
  );
}

export default App;
