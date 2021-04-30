import React from 'react';
import { useSelector,} from 'react-redux';
import { Link } from 'react-router-dom';

const SubNav = ({active}) => {

    const { subjects }  = useSelector(state => state.entities);

    return (
        <ul className="nav nav-fill nav-tabs mb-3">
            {subjects.list.map( subject => (
                <li className="nav-item" key={subject.id} >
                    <Link 
                        className={"nav-link " + (subject.title.toLowerCase() == active ? "active" : "")} 
                        to={"/subject/"+ subject.title.toLowerCase()}
                    >
                        {subject.title}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default SubNav;