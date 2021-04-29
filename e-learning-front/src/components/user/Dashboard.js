import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Tab, Tabs, Card, Button  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {Layout} from '../Layout/Layout';
import { getDashboard } from '../../reducers/user/UserActions';

const Dashboard = () => {


    const dispatch = useDispatch();

     const { courses, error, loading } = useSelector(state => state.dashboard);

     useEffect(() => {
        dispatch(getDashboard());
        if (error) {
            console.log(error)
        }
     }, [dispatch, error])



     const folledCourses = () => {
        return (
            <React.Fragment>
            <h2>Mes cours</h2>

            {courses && courses.map( course => (
                <Card key={course.id} style={{flexDirection: 'row'}} className="mb-2">
                <Card.Img variant="top" src={course.image} style={{width:'30%'}}/>
                <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.overview}</Card.Text>
                    <Button variant="info" 
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
        )
    }

    const favoriteCourse = () => {
        return (
            <React.Fragment>
            <h2>Mes favoris</h2>

            {courses && courses.map( course => (
                <Card key={course.id} style={{flexDirection: 'row'}} className="mb-2">
                <Card.Img variant="top" src={course.image} style={{width:'30%'}}/>
                <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.overview}</Card.Text>
                    <Button variant="info" 
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
        )
    }

    return (
        <Layout title="Tableau de bord" 
                description="Investissez dans votre avenir."

                className="container">

            <Tabs defaultActiveKey="home">
                <Tab eventKey="home" title="Mes cours">
                    {folledCourses()}
                </Tab>
                <Tab eventKey="whish-list" title="Mes favoris">
                    {favoriteCourse()}
                </Tab> 
            </Tabs>
        </Layout>
    )
}

export default Dashboard;