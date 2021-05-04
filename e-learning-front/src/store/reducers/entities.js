import { combineReducers } from 'redux';

import coursesReducer from '../course/list';
import courseDetailsReducer from '../course/details';
import subjectsReducer from '../subject/list';
import contentReducer from '../course/content';
import moduleReducer from '../course/module';


export default combineReducers({
    courses : coursesReducer,
    courseDetails: courseDetailsReducer,
    module: moduleReducer,
    content: contentReducer,
    subjects: subjectsReducer,
});
