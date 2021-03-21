import React, { Component } from 'react';
import axios from 'axios';

class Subjects extends Component {
    state = {
        subjects: []
    }
    componentDidMount = async () => {
        const response = await axios.get('subjects/');

        this.setState({
            subjects: response.data
        })
    }
    render() {
        return (
            <>
                <h1>Hello world, from subjects</h1>
                <ul>
                    {this.state.subjects.map(
                        (subject) => {
                            return (
                                <li key={subject.id}>
                                    {subject.title} - {subject.id}
                                </li>
                            )
                        }
                    )}

                </ul>
            </>
        )
    }
}

export default Subjects;