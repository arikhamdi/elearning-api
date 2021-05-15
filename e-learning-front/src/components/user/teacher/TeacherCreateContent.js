import React, {useState} from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import InputForm from '../../Layout/InputForm'

const TeacherCreateContent = ({match}) => {

    const modelName = match.params.modelName

    const [errors, setErrors] = useState({})

    const [values, setValues] = useState({
        title : "",
        content: ""
    }) 

    const { title, content } = values

    const formChangeHandler = name => e => {

        setValues({
            ...values,
            [name]: e.target.value
        })
    }

    return (
        <Container>
        <h1 className="text-center">{`Ajouter un ${modelName.toUpperCase()}`}</h1>
            <Form>
            <InputForm 
                label="Titre"
                type='text'
                placeholder="Entrer votre titre"
                value={title}
                onChange={formChangeHandler('title')}
                error={errors?.title}
            />
            <InputForm 
                as="textarea" 
                rows={10}
                label="content"
                placeholder="Entrer votre titre"
                value={content}
                onChange={formChangeHandler('content')}
                error={errors?.title}
            />
            <Button type="submit">Ajouter</Button>
            </Form>
        </Container>
    )
}

export default TeacherCreateContent


