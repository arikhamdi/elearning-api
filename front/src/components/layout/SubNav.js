import React from 'react';

import { Consumer } from '../../context';

const SubNav = (props) => {
    const { subject } = props.subject;

    console.log(subject);
    return (
        <ul className="nav nav-tabs mb-3">
        <Consumer>
        {
            value => {
                const {subjects} = value;
                return (
                    subjects.map( cat => (
                        <li className="nav-item " key={cat.id} >
                        <a className={"nav-link " + (cat.title.toLowerCase() == subject ? "active" : "")} href={"/subject/"+ cat.title.toLowerCase()}>{cat.title}</a>
                    </li>
                ))

                )
            }
        }

        </Consumer>
        </ul>
    )
}

export default SubNav;