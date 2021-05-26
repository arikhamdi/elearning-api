import React, {useEffect, useState, useCallback} from 'react'
import { Container, Form, Button, Row, Col , Image} from 'react-bootstrap'
import marked from 'marked'
import DOMPurify from 'dompurify'
import { useDispatch, useSelector } from 'react-redux'
import {teacherAddFileContent} from '../../../store/course/content'
import { history } from '../../../store'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'

const TeacherCreateContentFile = ({match}) => {

    const dispatch = useDispatch()
    const { successAdded, error, loading } = useSelector(state => state.entities.content)

    const moduleId = match.params.moduleId

    const [errors, setErrors] = useState({})

    const [title, setTitle] = useState("")
    const [files, setFiles] = useState([]);


    useEffect(() => {
        if (successAdded) {
            localStorage.removeItem("moduleId")
            localStorage.removeItem("title")
            history.push(`/teacher/course/${match.params.slug}/edit`);
            window.location.reload();
        }

        if (error) {
            setErrors({...error});
        }

        if (localStorage?.getItem("moduleId") === moduleId){
            setTitle(localStorage.getItem(`title`) !== null ? localStorage.getItem(`title`) : "")

        } else {
            localStorage.setItem("moduleId", moduleId)
        }     
    },[successAdded, error])

    useEffect(() => {
        localStorage.setItem("title", title)
    },[title])

    

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: file.name
          })))
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: '.pdf'})

     
    const sendFileHandler = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('title', title)
        files.map(file => formData.append('file', file, file?.name))

        dispatch(teacherAddFileContent(moduleId, formData))
    }

    const thumbs = files.map(file => (
        <div key={file.name}>
          <div className="text-center">
            <h3>{file.preview}</h3>
          </div>
        </div>
      ));

    return (
        <Container>
        <h1 className="text-center">{`Ajouter un fichier pdf`}</h1>
            
            <Form onSubmit={sendFileHandler}>
            <Form.Group>
            <Form.Control type="text" 
                placeholder="Entrer votre titre"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={errors?.title}
                />
            <Form.Control.Feedback type="invalid">
                {errors?.title}
            </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
            <div {...getRootProps()}
            style={{border: "3px dashed #f0f0f0", background:"#f8f8f8", textAlign:"center", padding:"50px 0"}}>
            <input {...getInputProps()} />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
            
            </div>
            </Form.Group>
            <aside>
                {thumbs}
            </aside>
            <Button type="submit">Ajouter</Button>
            </Form>
            
            
            
        </Container>
    )
}

export default TeacherCreateContentFile


