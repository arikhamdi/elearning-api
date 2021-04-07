import React, {Component} from 'react';

import axios from 'axios';

const Context = React.createContext();


export class Provider extends Component {

    state = {
        subjects: []
    }

    componentDidMount = async () => {
        const response = await axios.get('subjects/');

        this.setState({
            subjects : response.data
        });
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;