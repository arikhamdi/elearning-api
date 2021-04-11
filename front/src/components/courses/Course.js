import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import PropTypes from 'prop-types'

import {Card, Button, ListGroup} from 'react-bootstrap';
import { getCourseDetail} from './CoursesAction';
import axios from 'axios';

class Course extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id:'',
            title:'',
            overview:'',
            owner:'',
            slug:'',
            publish:'',
            subject:'',
            students:[],
            image:'',
            modules:[],
            isStudent : false
        };
      }

    componentWillReceiveProps(nextProps, nextState) {
        const { 
            id,
            title,
            overview,
            owner,
            slug,
            publish,
            subject,
            students,
            image,
            modules 
        } = nextProps.course;

        this.setState({
            id,
            title,
            overview,
            owner,
            slug,
            publish,
            subject,
            students,
            image,
            modules 
        })

        if (students.filter((student) => student.email == this.props.auth.user.email).length > 0) {
            this.setState({isStudent: true})
        }
    }

    componentDidMount(){
        this.props.getCourseDetail(`${this.props.match.params.slug}`);
    }
    enroll =  async () => {
        try {
            await axios.post(`${this.props.match.params.slug}/enroll/`);
            this.setState({isStudent: !this.state.isStudent});
            if (this.state.isStudent)
                this.props.history.push(`/student/${this.props.match.params.slug}`);
        } catch (error) {
            console.log("Error: " , error);
        } 
    }

    followCourse =  async () => {
        try {
            axios.get(`/users/student/${this.props.match.params.slug}`);
            this.props.history.push(`/student/${this.props.match.params.slug}`);
        } catch (error) {
            console.log("Error: " , error);
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
                students,
                image,
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
                    {this.state.isStudent  ? (
                        <>
                        <Button variant="info" onClick={() => this.followCourse()} >continuer ce cours</Button>
                        <Button variant="danger" onClick={() => this.enroll()} >Arreter ce cours</Button>
                        </>
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

Course.propType = {
    getCourseDetail : PropTypes.func.isRequired,
    course : PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
    
};

const mapStateToProps = state => ({
    course: state.courses.course,
    auth: state.auth 
});
  
export default connect(mapStateToProps,{
    getCourseDetail
})(withRouter(Course));