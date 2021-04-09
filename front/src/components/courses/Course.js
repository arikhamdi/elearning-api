import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {Link } from 'react-router-dom';
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
        modules : []
    };

    componentDidMount = async () => {
        console.log(this.props.match.params.slug);

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
                modules } = response.data;
            
            this.setState({
                id,
                title,
                overview,
                owner,
                slug,
                subject,
                publish,
                modules
            });

            console.log(response.data);
        } catch (error) {
            console.log('Error: ', error);
        }

    }
    

    render() {

        const { id,
            title,
            overview,
            owner,
            slug,
            publish,
            subject,
        modules } = this.state;
        
    
        return (
            <React.Fragment>
                <Card className="mb-3">
                
                <Card.Img variant="top" src="https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
                <Card.Header style={{textTransform: 'capitalize'}}>Créé par <cite title="Source Title">{owner.name}</cite></Card.Header>
                <Card.Body>
                    <Card.Title style={{textTransform: 'capitalize'}} >{title}</Card.Title>
                    <Card.Text>{overview}</Card.Text>
                    
                    <footer className="text-right">
                    <Button variant="success" onClick={() => this.enroll()} >Suivre ce cours</Button>
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