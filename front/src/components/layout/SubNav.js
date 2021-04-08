import React from 'react';

import { Consumer } from '../../context';

const SubNav = props => {

    return (
        <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
                <a className="nav-link active" href="#">Active</a>
        </li>
        <Consumer>
        {
            value => {
                const {subjects} = value;
                return (
                    subjects.map( subject => (
                        <li className="nav-item" key={subject.id} >
                        <a className="nav-link" href="#">{subject.title}</a>
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