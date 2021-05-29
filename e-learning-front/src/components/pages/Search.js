import React, {useEffect, useState} from 'react';
import {Layout} from '../Layout/Layout';
import { CardColumns} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Course from '../course/Course';
import Paginator from '../Paginator';

import { useDispatch, useSelector } from 'react-redux';
import {Loader} from '../Layout/Loader';
import {NotFoundSmall} from './NotFound';
import PageLayout from '../Layout/PageLayout';
import { searchCourses } from '../../store/course/list';

const  Search = () => {

    const dispatch = useDispatch();

    const coursesList = useSelector(state => state.entities.courses);
    const { loading, list, errors } = coursesList;
    const [page, setPage] = useState(1)
    const [lastPage , setLastPage ] = useState(0)

    const history = useHistory()    
    
    useEffect(() => {
        dispatch(searchCourses(`search${history.location.search}&page=${page}`))
        setLastPage(Math.ceil(list.meta?.last_page / list.meta?.page_size))
    }, [dispatch, history.location.search, list.meta?.last_page])


    const handlePageChange = (page) => {
        setPage(page)
        dispatch(searchCourses(`search${history.location.search}&page=${page}`))
    }

    return (
        <Layout title="Recherche"
                description={`Votre résultat pour "${history.location.search.split("=")[1]}"`}
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.irlabnp.org%2Fwp-content%2Fuploads%2F2015%2F11%2Fschoolgirl-1.png&f=1&nofb=1"
                className="container"
                >
                    {/* <h5>Il y a {list?.data?.length} cours contenant "{history.location.search.split("=")[1]}"</h5> */}
        <CardColumns style={{columnCount: '2'}}>
        {loading ? <Loader/> : errors ? <NotFoundSmall /> :
            (list?.data?.length ? list?.data?.map(
                (course) => (
                    <Course key={course.id} course={course} />
                )
            ) : <PageLayout title="Aucun contenu" />)}
        </CardColumns>
            
        {lastPage > 1 ? 
        <Paginator lastPage={lastPage} handlePageChange={handlePageChange} />
            :
            null
        }
        </Layout>
    )
    };

export default Search;