import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { Container } from "react-bootstrap";
import { connect } from 'react-redux';

import Slider from '../layout/Slider';
import SubNav from '../layout/SubNav';

import {Card} from 'react-bootstrap';

import { getCourses } from './CoursesAction';
import PropTypes from 'prop-types'


class Courses extends Component {

    componentDidMount() {
        this.props.getCourses(this.props.router.location.pathname);
    }

    render() {
        return (
            <Container>
                <Slider />
                <SubNav />
                <div className="card-deck">
                {
                    this.props.courses.map(
                        course => (
                            <Card key={course.id} 
                                  onClick={() => this.props.history.push("/course/"+ course.slug + "/")} 
                                  style={{cursor: 'pointer'}}>
                            <Card.Img variant="top" src={course.image} />
                            <Card.Header className="text-right" style={{textTransform: 'capitalize'}}>
                                {course.subject.title}
                            </Card.Header>
                            <Card.Body>
                                <Card.Title style={{textTransform: 'capitalize'}} >{course.title}</Card.Title>
                                <Card.Text>{course.overview}</Card.Text>
                                <footer className="blockquote-footer">
                                    <cite title="Source Title">{course.owner.name}</cite>
                                </footer>
                            </Card.Body>
                            </Card>
                        )
                    )
                }   
                </div>
            </Container>
        )
    }
}

Courses.propTypes = {
    courses : PropTypes.array.isRequired,
    getCourses: PropTypes.func.isRequired,
    router : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    courses : state.courses.courses,
    router: state.router
})

export default connect(mapStateToProps,{
    getCourses
})(withRouter(Courses));