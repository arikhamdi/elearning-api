import React, {Fragment, useState, useEffect} from 'react'
import { Button, Col, Container, Form } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux';
import { history } from '../../../store';
import { addNewModule } from '../../../store/course/module';

const TeacherAddModule = ({match}) => {

    const dispatch = useDispatch();

    const { error, loading } = useSelector(state => state.entities.module);

    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        title: "",
        overview: ""
    });
    const {title, overview} = values;


    useEffect(() => {
        if (error) {
            setErrors({...error});
        } else if (!error) {
            history.push(`/teacher/course/${match.params.slug}/edit`);
            window.location.reload();
        }
    }, [error])

    const formChangeHandler = name => e => {
        setValues({
            ...values,
            [name]: e.target.value
        });
        setErrors({});
    }
    

    const submitHandler = (e) => {
        e.preventDefault();
        const newModule = {
            title : title, 
            overview: overview
        };
        dispatch(addNewModule(`/users/teacher/${match.params.slug}/modules/`, newModule));
    };

    return (
        <Fragment>
            <Container>
                <h1>Ajouter un module</h1>
                <Form noValidate onSubmit={submitHandler}>
                    <Form.Group>
                        <Form.Row>
                            <Form.Label column lg={2}>
                                Titre
                            </Form.Label>
                            <Col>
                                <Form.Control 
                                type="text" 
                                placeholder="Entrer le titre" 
                                value={title}
                                onChange={formChangeHandler('title')}
                                isInvalid={errors?.title}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors?.title}
                                </Form.Control.Feedback>
                            </Col>
                        </Form.Row>
                    </Form.Group>
                    <Form.Group>
                <Form.Row>
                    <Form.Label column lg={2}>
                        Description
                    </Form.Label>
                    <Col>
                        <Form.Control 
                        as="textarea" 
                        rows={3}
                        placeholder="Entrer la descrtiption" 
                        value={overview}
                        onChange={formChangeHandler('overview')}
                        isInvalid={errors?.overview}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors?.overview}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Row>
            </Form.Group>
            <Form.Group className="text-right">
            <Button variant="dark mr-3" href={`/teacher/course/${match.params.slug}/edit`}>retour</Button>
            {loading ? 
                <Button type="submit" disabled>Loading</Button>
            :
            <Button type="submit" >Enregistrer</Button>
            }
            </Form.Group>
                
                </Form>
            </Container>
        </Fragment>

    )
}

export default TeacherAddModule;
