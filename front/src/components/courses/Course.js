import React, { Component } from 'react'

import {Card, Button, ListGroup} from 'react-bootstrap';
import axios from 'axios';

class Course extends Component {
    state = {
        id: "",
        title: "",
        overview: "",
        owner: "",
        slug: "",
        subject: "",
        publish: "",
        image: "",
        modules : [],
        students: [],
        isStudent: false
    };

    componentDidMount = async () => {
        const {email}  = JSON.parse(localStorage.getItem('user'));
        
        try{
            const response = await axios.get(`${this.props.match.params.slug}`);

            const {            
                id,
                title,
                overview,
                owner,
                slug,
                subject,
                publish,
                image,
                students,
                modules } = response.data;
            
            this.setState({
                id,
                title,
                overview,
                owner,
                slug,
                subject,
                publish,
                modules,
                image,
                students
            });
            
            if (students.filter((student) => student.email == email).length > 0) {
                this.setState({isStudent: true})
            }
            console.log(response.data);

        } catch (error) {
            console.log('Error: ', error);
        }

    }

    enroll = async () => {
        try{
            const response = await axios.post(`${this.props.match.params.slug}/enroll/`);
            console.log(response);
        } catch (error) {
            console.log("Error: " , error);
        }

        this.setState({isStudent: !this.state.isStudent});
    }

    followCourse = () => {
        axios.get(`/users/student/${this.props.match.params.slug}`)
            .then(response => {
                console.log(response);
                this.props.history.push(`/student/${this.props.match.params.slug}`);
            })
            .catch(error => {
                
                console.log('Error: ', error);
            })
    }

    

    render() {

        const { id,
            title,
            overview,
            owner,
            slug,
            publish,
            subject,
            students,
            image,
            isStudent,
        modules } = this.state;
        
    
        return (
            <React.Fragment>
                <Card className="mb-3">
                
                <Card.Img variant="top" src={image} />
                <Card.Header style={{textTransform: 'capitalize'}}>Créé par <cite title="Source Title">{owner.name}</cite></Card.Header>
                <Card.Body>
                    <Card.Title style={{textTransform: 'capitalize'}} >{title}</Card.Title>
                    <Card.Text>{overview}</Card.Text>
                    
                    <footer className="text-right">
                    {isStudent ? (
                        <Button variant="primary" onClick={() => this.followCourse()} >continuer ce cours</Button>
                    ) : (
                        <Button variant="success" onClick={() => this.enroll()} >Suivre ce cours</Button>
                        
                    )}
                    
                    </footer>
                </Card.Body>
                
                </Card>

                <h3 className="mb-3" style={{textTransform: 'capitalize'}} >Contenu du cours</h3>
                <ListGroup>
                {modules.map( module => (
                    
                    <ListGroup.Item key={module.id} style={{textTransform: 'capitalize'}}>{module.title}</ListGroup.Item>
                    
                    
                ))}
                </ListGroup>
                
       
            </React.Fragment>
        )
    }
}
  
export default Course;