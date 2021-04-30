import React, { Fragment } from 'react';
import { Nav, Button, Dropdown, Card } from 'react-bootstrap';
import { useSelector} from 'react-redux';
import { history } from '../../store';

const ShowFavorisIcone = () => {

    const { favorisItems } = useSelector(state => state.auth.favoris);

    const countFavoris = favorisItems.length;

    return (
        <Dropdown alignRight>
                <Dropdown.Toggle 
                    as={Nav.Link} 
                >
                <i className="fas fa-star"></i>
                {(countFavoris > 0) && 
                <span className='badge badge-warning' id='lblCartCount'>{countFavoris}</span>}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="text-center" style={{width: "330px"}}>

                    {(countFavoris > 0) ? (
                        <Fragment>
                        {favorisItems && favorisItems.map(item => (
                            <Fragment key={item.id} >
                                <Card 
                                style={{flexDirection: 'row', border:'none', margin:"15px"}} 
                                className="mb-2">
                                <Card.Img variant="top" src={item.image} 
                                style={{ objectFit: "cover", width:'90px', height:"90px"}}/>
                                <Card.Body className="text-left">
                                <Card.Subtitle className="text-capitalize" >{item.title}</Card.Subtitle>
                                <Card.Text>{item?.owner?.name}</Card.Text>
                                </Card.Body>
                                </Card>
                                <Dropdown.Divider />
                            </Fragment>
                            
                        ))}  
                        <Dropdown.Header 
                            className="text-left"
                            style={{fontSize: "24px", fontWeight: "500", color:'black'}} 
                            >
                            {favorisItems.length} cours dans vos favoris
                        </Dropdown.Header>  
                        { history.location.pathname !== '/favoris' && (
                            <Button 
                            variant="danger" 
                            className="text-nowrap from-control"
                            href='/favoris'
                            >
                            Accéder au favoris
                        </Button>
                        )}                          

                        </Fragment>
                        ): (
                        <Fragment>
                            <Dropdown.Header>Vos favoris sont vide</Dropdown.Header>
                            <Dropdown.Divider />
                            <Nav.Link 
                                className="nav-link text-dark">
                                Chercher un cours
                            </Nav.Link>
                        </Fragment>
                    )}
                    </Dropdown.Menu>
                </Dropdown>
    )
}

export default ShowFavorisIcone;