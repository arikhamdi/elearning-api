import React, {useEffect, useState, useCallback} from 'react'
import { Container, Form, Button, Row, Col , Image} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {teacherEditContent, loadcontents} from '../../../store/course/content'
import { history } from '../../../store'
import {useDropzone} from 'react-dropzone'
import DeleteModal from './DeleteModal';

const TeacherEditContentFile = ({match}) => {

    const dispatch = useDispatch()
    const { successAdded, error, content } = useSelector(state => state.entities.content)

    const [show, setShow] = useState(false);
    const contentId = match.params.contentId

    const [errors, setErrors] = useState({})

    const [title, setTitle] = useState("")
    const [pdf, setPdf] = useState("")
    const [files, setFiles] = useState([]);


    useEffect(() => {
        dispatch(loadcontents(`/users/student/${match.params.slug}/content/${contentId}/`))
    },[dispatch])


    useEffect(() => {
        if (successAdded) {
            history.push(`/teacher/course/${match.params.slug}/edit`);
            window.location.reload();
        }

        if (error) {
            setErrors({...error});
        }  
    },[successAdded, error])


    useEffect(() => {
        setTitle(content?.item?.title || "") 
        setPdf(content?.item?.file || "")
    },[content])

    

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
            preview: file.name
          })))
      }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop, accept: '.pdf, .zip'})

     
    const sendFileHandler = e => {
        e.preventDefault()
        if (files.length > 0) {
            let formData = new FormData()
            formData.append('title', title)
            files.map(file => formData.append('file', file, file?.name))
    
            dispatch(teacherEditContent(contentId,formData))
        }
        else {
            dispatch(teacherEditContent(contentId,{title}))
        }
    }

    const thumbs = files.map(file => (
        <div key={file.name}>
          <div className="text-center">
            <h3>{file.preview}</h3>
          </div>
        </div>
      ));

    return (
        <Container className="mt-5">
        <DeleteModal 
        show={show} url={`/users/teacher/content/${contentId}`} 
        type={'content'} 
        redirectTo={`/teacher/course/${match.params.slug}/edit`} 
        handleClose={() => setShow(false)} 
        />
        <h1 className="text-center">{`Editer un fichier pdf`}</h1>
            
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
            {files.length > 0 ? null :
                (
                <aside style={{wordWrap: "break-word"}}>
                <div className="text-center" >
                <h3>{pdf.split("/").pop()}</h3>
            </div>
                </aside>
            )}
            <Button className="mr-3" type="submit">Enregistrer</Button>
            <Button variant="dark" className="mr-3" href={`/teacher/course/${match.params.slug}/edit`}>Retour</Button>
            <Button variant="danger" className="float-right" onClick={() => setShow(true)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
            </Form>
            
            
            
        </Container>
    )
}

export default TeacherEditContentFile


