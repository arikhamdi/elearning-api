import React from 'react';
import {connect} from 'react-redux';

const SubNav = (props) => {

    // check current pathname and split it to get subject parameter
    // used to activate tab menu 
    const str  = props.router.location.pathname;
    const subject = str.split("/")[2];

    return (
        <ul className="nav nav-tabs mb-3">
            {props.subject.map( cat => (
                <li className="nav-item " key={cat.id} >
                    <a className={"nav-link " + (cat.title.toLowerCase() == subject ? "active" : "")} href={"/subject/"+ cat.title.toLowerCase()}>{cat.title}</a>
                </li>
            ))}
        </ul>
    )
}

const mapStateToProps = state => ({
    subject: state.subject.subjects,
    router : state.router
})

export default connect(mapStateToProps, {})(SubNav);