import React from 'react';
import {connect} from 'react-redux';

const SubNav = (props) => {

    // check current pathname and split it to get subject parameter
    // used to activate tab menu 
    const str  = props.router.location.pathname;
    const activeSubject = str.split("/")[2];

    return (
        <ul className="nav nav-tabs mb-3">
            {props.subjects.map( subject => (
                <li className="nav-item " key={subject.id} >
                    <a className={"nav-link " + (subject.title.toLowerCase() == activeSubject ? "active" : "")} href={"/subject/"+ subject.title.toLowerCase()}>{subject.title}</a>
                </li>
            ))}
        </ul>
    )
}

const mapStateToProps = state => ({
    subjects: state.subjects.subjects,
    router : state.router
})

export default connect(mapStateToProps, {})(SubNav);