import React, { Component } from 'react'
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';


class Dashboard extends Component {

    state = {
        courses: [],
    }
    componentDidMount = async () => {

        try {
            const response = await axios.get('/users/dashboard/');
            this.setState({
                courses : response.data
            })
            console.log(response.data);
        } catch (error) {
            console.log('Error: ', error);
        }
        
        
    }

    removeCourse = async (slug) => {

        try{
            const response = await axios.post(`${slug}/enroll/`);
            console.log(response);
        } catch (error) {
            console.log("Error: " , error);
        }

        this.setState({ courses : this.state.courses.filter(course => course.slug !== slug)});
    }

    followCourse = slug => {
        axios.get(`/users/student/${slug}`)
            .then(response => {
                console.log(response);
                this.props.history.push(`/student/${slug}`);
            })
            .catch(error => {
                
                console.log('Error: ', error);
            })
    }


    render() {
        const { courses } = this.state;

        return (
            <React.Fragment>
            <h2>Mes cours</h2>

            {courses.map( course => (
                <Card key={course.id} style={{flexDirection: 'row'}} className="mb-2">
                <Card.Img variant="top" src={course.image} style={{width:'30%'}}/>
                <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.overview}</Card.Text>
                    <Button variant="primary" 
                            onClick={() => this.followCourse(course.slug)}>
                            Continuer le cours
                    </Button>
                    <Button variant="danger" 
                            style={{float: 'right'}} 
                            onClick={() => this.removeCourse(course.slug)}>
                            Arreter le cours    
                    </Button>
                </Card.Body>

                </Card>
                
            ))}
            </React.Fragment>
        );

        return (
            <div>
                <h1>Dashboard</h1>
                {courses.map( course => (
                    <div className="card" style={{flexDirection: 'row'}}>
                    <img src={course.image} className="card-img-top" style={{width:'30%'}} />
                    <div className="card-body">
                        <h5 className="card-title">{course.title}</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <a href="#" className="btn btn-primary">Continuer le cours</a>
                    </div>
                    </div>

                ))}
                
                
            </div>
        )
    }
}


export default Dashboard;