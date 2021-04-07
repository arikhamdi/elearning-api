import Courses from './components/courses/Courses';

import SignIn from './components/users/SignIn';
import SignUp from './components/users/SignUp';

import Header from './components/layout/Header';


import Footer from './components/layout/Footer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import {Provider} from './context';


import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Provider>
    <Router>
    <div className="App">
    <Header />
      <div className="container">

        <Route exact path="/" component={Courses} />
        <Route path="/:subject" component={Courses} />
        <Route exact path='/signin' component={SignIn} />
        <Route exact path='/signup' component={SignUp} />
      </div>
      <Footer />
    </div>
    </Router>

    </Provider>
  );
}

export default App;
