import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Tab, Tabs, Card, Button  } from 'react-bootstrap';
import {Layout} from '../Layout/Layout';
import { loadFavoris, removeItemToFavorisLoggedInUser } from '../../store/user/favoris';
import PageLayout from '../Layout/PageLayout';
import { Loader } from '../Layout/Loader';

const Dashboard = () => {


    const dispatch = useDispatch();

     const { favorisItems, loading } = useSelector(state => state.auth.favoris);

     let archivedItems = [];

     useEffect(() => {
        dispatch(loadFavoris());
     }, [dispatch])


     const removefromFavorisHandler = course => {
         dispatch(removeItemToFavorisLoggedInUser(course));

    }


     const favoriteCourse = () => {
        return (
            <React.Fragment>
            <h2>Mes favoris</h2>

            {loading ? <Loader />
            : favorisItems.length > 0  ? favorisItems.map( course => (
                <Card key={course.id} style={{flexDirection: 'row'}} className="mb-2">
                <Card.Img variant="top" src={course.image} style={{width:'30%'}}/>
                <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.overview}</Card.Text>
                    <Button variant="danger" 
                            style={{float: 'right'}} 
                            onClick={() => removefromFavorisHandler(course)}>
                            Arreter ce cours    
                    </Button>
                </Card.Body>

                </Card>
                
            ))
            :
            <PageLayout title="Aucun contenu" />
            }
            </React.Fragment>
        )
    }


     const archivedCourses = () => {
        return (
            <React.Fragment>
            <h2>Mes Archives</h2>

            {loading ? <Loader />
            : archivedItems.length > 0 ? archivedItems.map( course => (
                <Card key={course.id} style={{flexDirection: 'row'}} className="mb-2">
                <Card.Img variant="top" src={course.image} style={{width:'30%'}}/>
                <Card.Body>
                <Card.Title>{course.title}</Card.Title>
                    <Card.Text>{course.overview}</Card.Text>
                    <Button variant="info" 
                            onClick={() => this.followCourse(course.slug)}>
                            retier le cours des archives
                    </Button>
                    <Button variant="danger" 
                            style={{float: 'right'}} >
                            Arreter le cours    
                    </Button>
                </Card.Body>

                </Card>
            ))
            :
            <PageLayout title="Aucun contenu" />
            }
            </React.Fragment>
        )
    }



    return (
        <Layout title="Tableau de bord" 
                description="Investissez dans votre avenir."

                className="container">

            <Tabs defaultActiveKey="favoris">

                <Tab eventKey="favoris" title="Mes favoris">
                    {favoriteCourse()}
                </Tab> 
                <Tab eventKey="archives" title="Mes archives">
                    {archivedCourses()}
                </Tab>
            </Tabs>
        </Layout>
    )
}

export default Dashboard;