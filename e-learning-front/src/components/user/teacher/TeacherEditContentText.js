import React, {useEffect, useState} from 'react'
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import marked from 'marked'
import DOMPurify from 'dompurify'
import { useDispatch, useSelector } from 'react-redux'
import {loadcontents, teacherEditContent} from '../../../store/course/content'
import { history } from '../../../store'
import DeleteModal from './DeleteModal';

const TeacherEditContentText = ({match}) => {

    const dispatch = useDispatch()
    const { successAdded, content, loading } = useSelector(state => state.entities.content)
    const [show, setShow] = useState(false);

    console.log(content)

    const contentId = match.params.contentId

    const [errors, setErrors] = useState({})

    const [values, setValues] = useState({
        title : "",
        overview: ""
    }) 
    const { title, overview } = values

    useEffect(() => {
        dispatch(loadcontents(`/users/student/${match.params.slug}/content/${contentId}/`))
    },[dispatch])

    useEffect(() => {
        if (successAdded) {
            history.push(`/teacher/course/${match.params.slug}/edit`);
            window.location.reload();
        }    
    },[successAdded])

    useEffect(() => {
        setValues({
            title : content?.item?.title || "",
            overview: content?.item?.content || ""
        })
    },[content])


    

    

    const formChangeHandler = name => e => {
        setValues({
            ...values,
            [name]: e.target.value
        })
    }

    const renderText = text => {
        let clean = DOMPurify.sanitize( text , {USE_PROFILES: {html: true}});
        const __html = marked(clean)
        return {__html}
    }

    const AddTextContentHandler = (e) => {
        e.preventDefault()
        const editedText = {
            title:title,
            content:overview}
        dispatch(teacherEditContent(contentId,editedText))
    }

    return (
        <Container className="mt-5">
        <DeleteModal 
        show={show} url={`/users/teacher/content/${contentId}`} 
        type={'content'} 
        redirectTo={`/teacher/course/${match.params.slug}/edit`} 
        handleClose={() => setShow(false)} 
        />
        <h1 className="text-center">{`Editer un text`}</h1>
            
            <Form onSubmit={AddTextContentHandler}>
            <Form.Group>
            <Form.Control type="text" 
                placeholder="Entrer votre titre"
                value={title}
                onChange={formChangeHandler('title')}
                isInvalid={errors?.title}
                />
            <Form.Control.Feedback type="invalid">
                {errors?.title}
            </Form.Control.Feedback>
            </Form.Group>
            <Row>
            <Alert variant="primary">
            <p>Le text ci-dessous dois être rédigé en markdown. 
                Vous ne savez pas comment cela fonctionne? 
                <a href="https://www.markdownguide.org/cheat-sheet/" target="_blank">Suivez le guide</a></p>
            </Alert>
                
                
                <Col sm={6}>
            <Form.Group>
            <Form.Control 
                as="textarea" 
                rows={35} 
                placeholder="Entrer votre text"
                value={overview}
                onChange={formChangeHandler('overview')}
                isInvalid={errors?.overview}
            />
            <Form.Control.Feedback type="invalid">
                {errors?.overview}
            </Form.Control.Feedback>
            </Form.Group>
            </Col>
            <Col sm={6} >
            <div dangerouslySetInnerHTML={renderText(values['overview'])} style={{wordWrap: "break-word"}}/>
            </Col>
            </Row>
            <Button className="mr-3" type="submit">Enregistrer</Button>
            <Button variant="dark" className="mr-3" href={`/teacher/course/${match.params.slug}/edit`}>Retour</Button>
            <Button variant="danger" className="float-right" onClick={() => setShow(true)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
            </Form>
            
            
            
        </Container>
    )
}

export default TeacherEditContentText


