import React from 'react';
import { useDispatch, useSelector,} from 'react-redux';
import { Link } from 'react-router-dom';
import { getCourses } from '../../reducers/course/CourseActions';

const SubNav = ({active}) => {

    const dispatch = useDispatch();

    const { subjects, error }  = useSelector(state => state.subjects);
    const filterCourse = (subject) => {
        dispatch(getCourses(`/subject/${subject}`))
    }

    return (
        <ul className="nav nav-fill nav-tabs mb-3">
            {subjects && subjects.map( subject => (
                <li className="nav-item" key={subject.id} >
                    <Link 
                        className={"nav-link " + (subject.title.toLowerCase() == active ? "active" : "")} 
                        to={"/subject/"+ subject.title.toLowerCase()}
                        onClick={() => filterCourse(subject.slug)}
                    >
                        {subject.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default SubNav;