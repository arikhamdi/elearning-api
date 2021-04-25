import React, {useEffect} from 'react';
import Layout from '../Layout/Layout';
import { CardDeck} from 'react-bootstrap';

import Course from '../course/Course';
import SubNav from '../Layout/SubNav';

import { useDispatch, useSelector } from 'react-redux';
import { getCourses,getSubjects } from '../../reducers/course/CourseActions';
import {Loader} from '../Layout/Loader';

const  Home = ({match}) => {

    const dispatch = useDispatch();

    const { loading, courses, error } = useSelector(state => state.courses);


    useEffect(() => {
        dispatch(getCourses(match.url));
    }, [dispatch])

    return (
        <Layout title="Soyez ambitieux" 
                description="L'apprentissage vous permet de rester en tête." 
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.irlabnp.org%2Fwp-content%2Fuploads%2F2015%2F11%2Fschoolgirl-1.png&f=1&nofb=1"
                className="container">
        <SubNav active={match.params.subject}/>
        <CardDeck>
        {loading ? <Loader /> : 
            (courses && courses.map(
                (course) => (
                    <Course key={course.id} course={course} />
                )
            ))}
        </CardDeck>
            

        </Layout>
    )
    };

export default Home;