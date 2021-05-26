import React, {useEffect, useState, useCallback} from 'react'
import { Container, Form, Button, Row, Col , Image} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {teacherEditContent, loadcontents} from '../../../store/course/content'
import { history } from '../../../store'
import {useDropzone} from 'react-dropzone'
import { MEDIA_ROOT } from '../../../config';
import DeleteModal from './DeleteModal';

const TeacherEditContentImage = ({match}) => {

    const dispatch = useDispatch()
    const { successAdded, error, content } = useSelector(state => state.entities.content)

    const [show, setShow] = useState(false);
    const contentId = match.params.contentId

    const [errors, setErrors] = useState({})

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
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
        setImage(content?.item?.image || "")
    },[content])





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
        if (files.length > 0) {
            let formData = new FormData()
            formData.append('title', title)
            files.map(file => formData.append('image', file, file?.name))
    
            dispatch(teacherEditContent(contentId,formData))
        }
        else {
            dispatch(teacherEditContent(contentId,{title}))
        }

    }

    return (
        <Container className="mt-5">
        <DeleteModal 
        show={show} url={`/users/teacher/content/${contentId}`} 
        type={'content'} 
        redirectTo={`/teacher/course/${match.params.slug}/edit`} 
        handleClose={() => setShow(false)} 
        />
        <h1 className="text-center">{`Editer une image`}</h1>
            
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
            
                {files.length > 0 ? null :
                (
                  <aside style={thumbsContainer}>
                    <div style={thumb}>
                    <div style={thumbInner}>
                      <img
                        src={image && `${MEDIA_ROOT}${image}`}
                        style={img}
                      />
                    </div>
                    </div>
                    </aside>
                )}
            
            </Form.Group>

            <Button className="mr-3" type="submit">Enregistrer</Button>
            <Button variant="dark" className="mr-3" href={`/teacher/course/${match.params.slug}/edit`}>Retour</Button>
            <Button variant="danger" className="float-right" onClick={() => setShow(true)}><i className="fa fa-trash" aria-hidden="true"></i></Button>
            </Form>
            
            
            
        </Container>
    )
}

export default TeacherEditContentImage


