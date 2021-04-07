import React, { Component } from 'react';
import axios from 'axios';

import Slider from '../layout/Slider';
import SubNav from '../layout/SubNav';

import Course  from './Course';

export default class Courses extends Component {

    state = {
        courses: []
    }
    
    componentDidMount = async () => {
        let url = "/";

        if (this.props.match.params.subject) {
            url = `subject/${this.props.match.params.subject}`;
        }
        const response = await axios.get(url.toLowerCase());

        console.log(response);

        this.setState({
            courses: response.data
        });
    }

    render() {
        return (
            <React.Fragment>
                <Slider />
                <SubNav />
                <div className="card-deck">
                {
                    this.state.courses.map(
                        course => (
                            <Course key={course.id} course={course} />
                        )
                    )
                }   
                </div>
            </React.Fragment>
        )
    }
}
