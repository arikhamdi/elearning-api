import axios from 'axios';
import React, { Component } from 'react'

import {ListGroup, Row, Col} from 'react-bootstrap';

export default class FollowCourse extends Component {
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
        currentModule: []
    };

    componentDidMount = () => {
        console.log(this.props);
        axios.get(`/users/student/${this.props.match.params.slug}`)
        .then(response => {
            console.log(response.data);
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
            
        })
        .catch(error => {
            this.props.history.push(`/course/${this.props.match.params.slug}`);
            console.log('Error: ', error);
        })
    }

    showContent = moduleContent => {
        this.setState({
            currentModule: moduleContent
        });
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
            currentModule,
        modules } = this.state;
        
    
        return (
            <React.Fragment>

                <h3 className="mb-3" style={{textTransform: 'capitalize'}} >{title}</h3>
                <Row>
                    <Col>
                    <ListGroup>
                        {modules.map( module => (
                            
                            <ListGroup.Item key={module.id} onClick={() => this.showContent(module.contents)}  style={{cursor:"pointer",textTransform: 'capitalize'}}>{module.title}</ListGroup.Item>
                            
                            
                        ))}
                        </ListGroup>
                    </Col>
                    <Col xs={9}>{currentModule.map(content =>(
                        <div key={content.item.id}>
                        
                        <p>{content.item.content}</p>
                        <p>{content.item.image}</p>
                        <p>{content.item.file}</p>
                        <p>{content.item.url}</p>
                        </div>
                    ))}</Col>
                </Row>

                
       
            </React.Fragment>
        )
    }
}
