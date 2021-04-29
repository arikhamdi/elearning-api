import React, { Fragment } from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import { useDispatch, useSelector} from 'react-redux';
import {LayoutFluid} from '../Layout/Layout';
import {removeItemFromCart} from '../../store/user/cart'
import PageLayout from '../Layout/PageLayout'

import '../../Styles.css';

const Cart = () => {

    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.auth.cart);
    
    const removeFromCartHandler = id => {
            dispatch(removeItemFromCart(id))
    }


    const cartList = () => {
        return (
            <Fragment>
            <p style={{fontSize: "20px", fontWeight: "400"}}>{cartItems.length} cours dans le panier</p>
            {cartItems && cartItems.map( course => (
                <Card key={course.id} style={{flexDirection: 'row'}} className="mb-2">
                <Card.Img variant="top" src={course.image} style={{width:'20%'}}/>
                <Card.Body style={{width:'50%'}}>
                <Card.Title className="text-capitalize">{course.title}</Card.Title>
                    <Card.Text>{course.owner?.name}</Card.Text>
                </Card.Body>
                <Card.Body style={{width:'20%'}}>
                <Card.Title style={{color: "red", fontWeight: "500"}}>249,99 €</Card.Title>
                </Card.Body>
                <Card.Body className="text-left" style={{width:'10%'}}>
                <Card.Link onClick={() => removeFromCartHandler(course.id)} ><i className="fas fa-trash-alt"></i></Card.Link>
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
                { cartItems.length ? (
                    <Container className="cart-list" >
                        <div  className="cart-content">
                            {cartList()}  
                        </div>
                        <div className="cart-side">
                        <div>
                        <p style={{fontSize: "20px", fontWeight: "400"}}>Total :</p>
                        <p style={{fontSize: "40px", fontWeight: "700"}}>500,00 €</p>
                        <Button variant="danger" className="form-control" >Validation</Button>
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

export default Cart
