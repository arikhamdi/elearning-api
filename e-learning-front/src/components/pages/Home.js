import React, {useEffect, useState} from 'react';
import {Layout} from '../Layout/Layout';
import { CardColumns, Container} from 'react-bootstrap';

import Course from '../course/Course';
import SubNav from '../menu/SubNav';

import { useDispatch, useSelector } from 'react-redux';
import {Loader} from '../Layout/Loader';
import {NotFoundSmall} from '../pages/NotFound';
import { LoadCourses } from '../../store/course/list';
import PageLayout from '../Layout/PageLayout';
import Paginator from '../Paginator';
import { useHistory } from 'react-router';


const  Home = ({match}) => {

    const dispatch = useDispatch();

    const coursesList = useSelector(state => state.entities.courses);
    const { loading, list, errors } = coursesList;
    const [page, setPage] = useState(1)
    const [lastPage , setLastPage ] = useState(0)

    let history = useHistory()


    useEffect(() => {
        dispatch(LoadCourses(`${match.url}?page=${page}`))
        setLastPage(Math.ceil(list.meta?.last_page / list.meta?.page_size))
    }, [dispatch, match.url, list.meta?.last_page])

    console.log(lastPage)
    const handlePageChange =  (page) => {
        setPage(page)

        dispatch(LoadCourses(`${match.url}?page=${page}`))
    }

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
        <CardColumns style={{columnCount: '2'}}>
        {loading ? <Loader/> : errors ? <NotFoundSmall /> :
            (list?.data?.length ? list?.data?.map(
                (course) => (
                    <Course key={course.id} course={course} />
                )
            ) : <PageLayout title="Aucun contenu" />)}
        </CardColumns>

        {lastPage !== 1 ? 
        <Paginator lastPage={lastPage} handlePageChange={handlePageChange} />
            :
            null
        }
            
        </Layout>
    )
    };

export default Home;