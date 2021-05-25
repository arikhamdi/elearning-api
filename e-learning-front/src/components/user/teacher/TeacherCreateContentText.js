import React, {useEffect, useState} from 'react'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import marked from 'marked'
import DOMPurify from 'dompurify'
import { useDispatch, useSelector } from 'react-redux'
import {teacherAddTextContent} from '../../../store/course/content'
import { history } from '../../../store'

const TeacherCreateContentText = ({match}) => {

    const dispatch = useDispatch()
    const { successAdded, contentsList, loading } = useSelector(state => state.entities.content)

    const moduleId = match.params.moduleId

    const [errors, setErrors] = useState({})

    const [values, setValues] = useState({
        title : "",
        overview: ""
    }) 
    const { title, overview } = values

    

    console.log(contentsList, successAdded)
    useEffect(() => {
        if (successAdded) {
            localStorage.removeItem("moduleId")
            localStorage.removeItem("title")
            localStorage.removeItem("text")
            history.push(`/teacher/course/${match.params.slug}/edit`);
            window.location.reload();
        }

        if (localStorage?.getItem("moduleId") === moduleId){
            setValues({
                title : localStorage.getItem(`title`),
                overview : localStorage.getItem(`text`)  
            })
        } else {
            localStorage.setItem("moduleId", moduleId)
        }     
    },[successAdded])

    useEffect(() => {
        localStorage.setItem("text", overview)
    },[overview])

    useEffect(() => {
        localStorage.setItem("title", title)
    },[title])

    

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
        const newText = {
            title:title,
            content:overview}
        dispatch(teacherAddTextContent(moduleId,newText))
    }

    return (
        <Container>
        <h1 className="text-center">{`Ajouter un text`}</h1>
            
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
            <Button type="submit">Ajouter</Button>
            </Form>
            
            
            
        </Container>
    )
}

export default TeacherCreateContentText


