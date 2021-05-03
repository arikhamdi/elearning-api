import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Tab, Tabs, Card, Button, ListGroup  } from 'react-bootstrap';
import {Layout} from '../Layout/Layout';
import { loadFavoris, removeItemToFavorisLoggedInUser } from '../../store/user/favoris';
import PageLayout from '../Layout/PageLayout';
import { Loader } from '../Layout/Loader';

const Dashboard = () => {


    const dispatch = useDispatch();

     const { favorisItems, loading } = useSelector(state => state.auth.favoris);
     const countFavoris = favorisItems.length;
     let archivedItems = [];

     useEffect(() => {
        dispatch(loadFavoris());
     }, [dispatch])


     const removefromFavorisHandler = course => {
         dispatch(removeItemToFavorisLoggedInUser(course));

    }


    const favorisList = () => {
        return (
            <Fragment>
            <p style={{fontSize: "20px", fontWeight: "400"}}>{countFavoris} cours dans les favoris</p>
            { loading ? <Loader />
            : countFavoris > 0 ? favorisItems.map( course => (
                <Card key={course.id} style={{flexDirection: 'row'}} className="mb-2">
                <Card.Img variant="top" src={course.image} style={{width:'20%'}}/>
                <Card.Body style={{width:'60%'}}>
                <Card.Title className="text-capitalize">
                    <Card.Link href={`/course/${course.slug}`}>{course.title}</Card.Link>
                </Card.Title>
                    <Card.Text>{course.owner?.name}</Card.Text>
                </Card.Body>
                <Card.Body className="text-left" style={{width:'20%'}}>
                    <Button 
                    variant="dark" 
                    className="mb-2 form-control"
                    href={`/student/${course.slug}`}>
                            Accéder au cours   
                    </Button>
                     <Button 
                     variant="danger"
                     className="mb-2 form-control"
                     onClick={() => removefromFavorisHandler(course)}>
                            Arreter ce cours    
                    </Button>
                </Card.Body>
                </Card>
                
            ))
            :
            <PageLayout title="Aucun contenu" />
            }
            </Fragment>
        )
    }


     const archivedCourses = () => {
        return (
            <Fragment>
            <h2>Mes Archives</h2>

            {loading ? <Loader />
            : archivedItems.length > 0 ? archivedItems.map( course => (
                <Card key={course.id} style={{flexDirection: 'row'}} className="mb-2">
                <Card.Img variant="top" src={course.image} style={{width:'30%'}}/>
                <Card.Body>
                <Card.Title className="text-capitalize">{course.title}</Card.Title>
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
            </Fragment>
        )
    }



    return (
        <Layout title="Tableau de bord" 
                description="Investissez dans votre avenir."

                className="container">

            <Tabs defaultActiveKey="favoris">

                <Tab eventKey="favoris" title="Mes favoris">
                    {favorisList()}
                </Tab> 
                <Tab eventKey="archives" title="Mes archives">
                    {archivedCourses()}
                </Tab>
            </Tabs>
        </Layout>
    )
}

export default Dashboard;