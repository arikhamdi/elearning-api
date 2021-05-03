import React, {useEffect} from 'react';
import {Layout} from '../Layout/Layout';
import { CardDeck} from 'react-bootstrap';

import Course from '../course/Course';
import SubNav from '../menu/SubNav';

import { useDispatch, useSelector } from 'react-redux';
import {Loader} from '../Layout/Loader';
import {NotFoundSmall} from '../pages/NotFound';
import { LoadCourses } from '../../store/course/list';
import PageLayout from '../Layout/PageLayout';

const  Home = ({match}) => {

    const dispatch = useDispatch();

    const coursesList = useSelector(state => state.entities.courses);
    const { loading, list, errors } = coursesList;

    useEffect(() => {
        dispatch(LoadCourses(match.url));
    }, [dispatch, match.url])

    return (
        <Layout title="Soyez ambitieux" 
                description="L'apprentissage vous permet de rester en tête." 
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.irlabnp.org%2Fwp-content%2Fuploads%2F2015%2F11%2Fschoolgirl-1.png&f=1&nofb=1"
                className="container"
                button_link="/subscribe"
                button_content="Abonnez-vous"
                align="right"
                >
        <SubNav active={match.params.subject}/>
        <CardDeck>
        {loading ? <Loader/> : errors ? <NotFoundSmall /> :
            (list.length ? list.map(
                (course) => (
                    <Course key={course.id} course={course} />
                )
            ) : <PageLayout title="Aucun contenu" />)}
        </CardDeck>
            

        </Layout>
    )
    };

export default Home;