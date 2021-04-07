import React, { Component } from 'react'

export default class Subjects extends Component {
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
            <div>
                
            </div>
        )
    }
}
