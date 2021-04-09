import React, { Component } from 'react'
import axios from 'axios';


class Dashboard extends Component {

    componentDidMount = async () => {

        const response = await axios.get('/users/dashboard/');
        console.log(response);
        
    }


    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                
            </div>
        )
    }
}


export default Dashboard;