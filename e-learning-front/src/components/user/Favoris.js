import React, { Fragment } from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import {LayoutFluid} from '../Layout/Layout';
import { removeItemFromFavoris } from '../../store/user/favoris';
import PageLayout from '../Layout/PageLayout'

import '../../Styles.css';


const Favoris = () => {

    const dispatch = useDispatch();
    const { favorisItems } = useSelector(state => state.auth.favoris);

    const countFavoris = favorisItems.length;
    
    const removefromFavorisHandler = course => {
        dispatch(removeItemFromFavoris(course));
    }


    const favorisList = () => {
        return (
            <Fragment>
            <p style={{fontSize: "20px", fontWeight: "400"}}>{countFavoris} cours dans les favoris</p>
            {favorisItems && favorisItems.map( course => (
                <Card key={course.id} style={{flexDirection: 'row'}} className="mb-2">
                <Card.Img variant="top" src={course.image} style={{width:'20%'}}/>
                <Card.Body style={{width:'70%'}}>
                <Card.Title className="text-capitalize">{course.title}</Card.Title>
                    <Card.Text>{course.owner?.name}</Card.Text>
                </Card.Body>
                <Card.Body className="text-left" style={{width:'10%'}}>
                <Card.Link onClick={() => removefromFavorisHandler(course)} ><i className="fas fa-trash-alt"></i></Card.Link>
                </Card.Body>
                </Card>
                
            ))}
            </Fragment>
        )
    }


    return (
        <LayoutFluid title="Panier" 
                description="Investissez dans votre avenir."
                className="container">
                { countFavoris ? (
                    <Container className="cart-list" >
                        <div  className="cart-content">
                            {favorisList()}  
                        </div>
                        <div className="cart-side">
                        <div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                        Nulla fugit distinctio cumque eligendi in obcaecati repellat 
                        corrupti, eum reprehenderit sint libero dolorum voluptatum! 
                        Quidem fugit quibusdam facilis doloremque est tempora?</p> 
                        <Button variant="danger" className="form-control" >Abonnez-vous</Button>
                        </div>

                        </div>
                    </Container>
                )
                    
                    :
                    <PageLayout 
                        title="Votre panier est vide"
                        content="Continuez vos achats et trouvez un cours !"
                        link="/"
                        linkText="Continuer vos achats" 
                    />
                }    
        </LayoutFluid>
    )
}

export default Favoris
