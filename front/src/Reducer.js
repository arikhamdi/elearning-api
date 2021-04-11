import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { signupReducer } from "./components/users/signup/SignupReducer";
import { loginReducer } from "./components/users/login/LoginReducer";
import { subjectsReducer } from './components/subjects/SubjectsReducer';
import { coursesReducer } from './components/courses/CoursesReducer';

const createRootReducer = history => combineReducers({
    router: connectRouter(history),
    createUser: signupReducer,
    auth: loginReducer,
    subjects: subjectsReducer,
    courses: coursesReducer
});

export default createRootReducer;