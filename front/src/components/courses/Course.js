import React, { Component } from 'react'
import PropTypes from 'prop-types';

class Course extends Component {
    

    render() {
        const { id,
            title,
            overview,
            owner,
            slug,
            publish,
            subject } = this.props.course;

        return (
            <div className="card">
            <img className="card-img-top" src="https://cdn.pixabay.com/photo/2013/07/21/13/00/rose-165819_1280.jpg" alt="Card image cap" />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{overview}</p>
              <p className="card-text"><small className="text-muted">Publié le {publish}</small></p>
            </div>
          </div>
        )
    }
}

Course.propTypes = {
    course : PropTypes.object.isRequired
}

export default Course;