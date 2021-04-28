import { combineReducers } from 'redux';

import coursesReducer from '../course/list';
import courseDetailsReducer from '../course/details';
import subjectsReducer from '../subject/list';
import contentReducer from '../course/content';


export default combineReducers({
    courses : coursesReducer,
    courseDetails: courseDetailsReducer,
    content: contentReducer,
    subjects: subjectsReducer
});
