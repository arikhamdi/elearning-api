import React, {useEffect} from 'react';
import {Layout} from '../Layout/Layout';
import { CardDeck} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Course from '../course/Course';

import { useDispatch, useSelector } from 'react-redux';
import {Loader} from '../Layout/Loader';
import {NotFoundSmall} from './NotFound';
import PageLayout from '../Layout/PageLayout';
import { searchCourses } from '../../store/course/list';
// import { history } from '../../store';

const  Search = () => {

    const dispatch = useDispatch();

    const coursesList = useSelector(state => state.entities.courses);
    const { loading, list, errors } = coursesList;

    const history = useHistory()    
    
    useEffect(() => {
        console.log(history.location.search)
        dispatch(searchCourses(`search${history.location.search}`))
    }, [dispatch, history.location.search])

    return (
        <Layout title="Recherche"
                description={`Votre résultat pour "${history.location.search.split("=")[1]}"`}
                image="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.irlabnp.org%2Fwp-content%2Fuploads%2F2015%2F11%2Fschoolgirl-1.png&f=1&nofb=1"
                className="container"
                >
                    <h5>Il y a {list.length} cours contenant "{history.location.search.split("=")[1]}"</h5>
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

export default Search;