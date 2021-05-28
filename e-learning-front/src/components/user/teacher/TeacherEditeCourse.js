import React, { Fragment, useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row, ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { teacherLoadContents } from '../../../store/course/content'
import { LoadCourseDetails,  } from '../../../store/course/details'
import {SortableContainer, SortableElement} from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { editModule } from '../../../store/course/module'


const TeacherEditeCourse = ({match}) => {

    const dispatch = useDispatch()
    const [currentModule, setCurrentModule] = useState('')
    const { course, error } = useSelector(state => state.entities.courseDetails)
    const {contentsList} = useSelector(state => state.entities.content)

    const contentType = {
        "18" : "text",
        "20" : "image",
        "17" : "video",
        "21" : "file" 
    }
    const [items, setItems] = useState([])

    useEffect(() => {
        dispatch(LoadCourseDetails(`/users/teacher/${match.params.slug}`))
    }, [dispatch])

    useEffect(() => {
        setItems(course?.modules)
    }, [course])

    const loadModuleContents = (moduleId) => {
        dispatch(teacherLoadContents(moduleId))
        .then(setCurrentModule(moduleId))
    }

    

    
    const SortableItem = SortableElement(({value, index}) => (
        <li 
        index={index}
        style={{padding:"10px", listStyle: "none"}}>

            <div >
            <span>MODULE {index}</span><a className="float-right" href={`/teacher/course/${course?.slug}/${value?.id}/edit`}>editer</a>
            <br />
            <span style={{textTransform: "capitalize"}}>{value.title}</span>
            </div>
        </li>
    ))

    const SortableList = SortableContainer(({items}) => {
        return (
          <ul>
            {items?.map((value, index) => (
                <SortableItem 
                    value={value}
                    index={index}
                    key={value?.id}
                    onClick={() => loadModuleContents(value?.id)} style={{cursor: "pointer"}}
                />
            ))}
          </ul>
        );
      })
    
    const listModules = course?.modules?.map((module, index) => (
        <li 
        key={module?.id} 
        index={index}
        style={{padding:"10px", listStyle: "none"}}>

            <div onClick={() => loadModuleContents(module?.id)} style={{cursor: "pointer"}}>
            <span>MODULE {index +1}</span><a className="float-right" href={`/teacher/course/${course?.slug}/${module?.id}/edit`}>editer</a>
            <br />
            <span style={{textTransform: "capitalize"}}>{module.title}</span>
            </div>
        </li>
    ))

    const onSortEnd = ({oldIndex, newIndex}) => {
        
        let arr =  arrayMove(items, oldIndex, newIndex)
        for (let i = 0; i < arr.length; i++) {
            
            dispatch(editModule(`/users/teacher/module/${items[i]?.id}/`, {order: i}));
            console.log(items[i])
        }
        setItems(arr)
      }

    const modulesEdit = () => (
        <Fragment>
        <h4>Modules</h4>
        {/* <SortableList 
        items={items} 
        onSortEnd={onSortEnd} /> */}
        <ul>
        {
            listModules
        }
        </ul>
            <Button 
            variant="dark" 
            className="nav-link float-right" 
            href={`/teacher/course/${course?.slug}/module/new`}
            >
            Ajouter un nouveau module
            </Button>
        </Fragment>
        
    )

    const contentsEdit = () => (
        <ListGroup>
        {contentsList && contentsList.map( content => (
            <ListGroup.Item key={content?.item?.id}>
                
                {content?.item?.title}
                {/* <Button variant="danger" className="float-right" onClick={() => setShow(true)}><i className="fa fa-trash" aria-hidden="true"></i></Button> */}

                <Button  className="float-right" href={`/teacher/course/module/${match.params.slug}/${currentModule}/content/${content?.id}/${contentType[content?.content_type]}/edit`}><i className="fas fa-pencil-alt"></i></Button>
                <Button variant="light" className="mr-2 float-right">{contentType[content?.content_type]}</Button>
            </ListGroup.Item>

        ))}
         {currentModule !== "" ? 
         <ListGroup.Item>
         <h4>Ajouter un nouveau contenu</h4>
            <Button variant="light" className="mr-2" href={`/teacher/course/module/${match.params.slug}/${currentModule}/content/text`}>Texte</Button>
            <Button variant="light" className="mr-2" href={`/teacher/course/module/${match.params.slug}/${currentModule}/content/image`}>Image</Button>
            <Button variant="light" className="mr-2" href={`/teacher/course/module/${match.params.slug}/${currentModule}/content/video`}>Video</Button>
            <Button variant="light" className="mr-2" href={`/teacher/course/module/${match.params.slug}/${currentModule}/content/file`}>Fichier</Button>
         </ListGroup.Item>
         :
         <h4>Selectionner un module pour y ajouter du contenu</h4>
         }

            
        </ListGroup>

    )
    return (
        <Fragment>
        <Container className="mt-5">
        <h1 className="text-center mb-5" style={{textTransform: 'capitalize'}}>"{course?.title}"
        <Button className="ml-5" href={`/teacher/course/${match.params.slug}/edit/overview`}>Editer la description</Button>
        </h1>
        
            <Row  style={{padding: '0 15px'}}>
                <Col md={4} className="bg-dark text-light" style={{padding: '30px'}}>
                    {modulesEdit()}
                </Col>
                <Col md={8} style={{padding: '30px'}}>
                    {contentsEdit()}
                </Col>
            </Row>

            
        
        </Container>

        </Fragment>
    )
}

export default TeacherEditeCourse
