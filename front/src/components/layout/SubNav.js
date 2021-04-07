import React from 'react';

import { Consumer } from '../../context';

const SubNav = props => {

    return (
        <ul class="nav nav-tabs mb-3">
        <li class="nav-item">
                <a class="nav-link active" href="#">Active</a>
        </li>
        <Consumer>
        {
            value => {
                const {subjects} = value;
                return (
                    subjects.map( subject => (
                        <li className="nav-item">
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