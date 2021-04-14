import React from 'react';
import { useSelector,} from 'react-redux';

const SubNav = ({active}) => {

    const { subjects, error }  = useSelector(state => state.subjects);

    return (
        <ul className="nav nav-tabs mb-3">
            {subjects && subjects.map( subject => (
                <li className="nav-item " key={subject.id} >
                    <a className={"nav-link " + (subject.title.toLowerCase() == active ? "active" : "")} href={"/subject/"+ subject.title.toLowerCase()}>{subject.title}</a>
                </li>
            ))}
        </ul>
    )
}

export default SubNav;