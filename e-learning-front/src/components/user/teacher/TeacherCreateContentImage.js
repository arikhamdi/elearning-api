import React, {useEffect, useState, useCallback} from 'react'
import { Container, Form, Button, Row, Col , Image} from 'react-bootstrap'
import marked from 'marked'
import DOMPurify from 'dompurify'
import { useDispatch, useSelector } from 'react-redux'
import {teacherAddImageContent, teacherAddTextContent} from '../../../store/course/content'
import { history } from '../../../store'
import {useDropzone} from 'react-dropzone'
import axios from 'axios'

const TeacherCreateContentImage = ({match}) => {

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
            setTitle(localStorage.getItem(`title`) ==! null ? localStorage.getItem(`title`) : "")

        } else {
            localStorage.setItem("moduleId", moduleId)
        }     
    },[successAdded, error])

    useEffect(() => {
        localStorage.setItem("title", title)
    },[title])

    

    const renderText = text => {
        let clean = DOMPurify.sanitize( text , {USE_PROFILES: {html: true}});
        const __html = marked(clean)
        return {__html}
    }

    const AddTextContentHandler = (e) => {
        e.preventDefault()
        const newText = {
            title:title
        }
        dispatch(teacherAddTextContent(moduleId,newText))
    }

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })))
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: 'image/jpeg, image/png'})

    const thumbsContainer = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 16
      };

    const thumb = {
        display: 'inline-flex',
        borderRadius: 2,
        border: '1px solid #eaeaea',
        marginBottom: 8,
        marginRight: 8,
        width: 400,
        height: 250,
        padding: 4,
        boxSizing: 'border-box'
      };
      
      const thumbInner = {
        display: 'flex',
        minWidth: 0,
        overflow: 'hidden'
      };
      
      const img = {
        display: 'block',
        width: 'auto',
        height: '100%'
      };

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img
              src={file.preview}
              style={img}
            />
          </div>
        </div>
      ));
     
    const sendImageHandler = e => {
        e.preventDefault()
        let formData = new FormData()
        formData.append('title', title)
        files.map(file => formData.append('image', file, file?.name))

        dispatch(teacherAddImageContent(moduleId, formData))
    }

    return (
        <Container>
        <h1 className="text-center">{`Ajouter une image`}</h1>
            
            <Form onSubmit={sendImageHandler}>
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
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
            </Form.Group>

            <Button type="submit">Ajouter</Button>
            </Form>
            
            
            
        </Container>
    )
}

export default TeacherCreateContentImage


