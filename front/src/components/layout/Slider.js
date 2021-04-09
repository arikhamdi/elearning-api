import React, { Component } from 'react'

import { Carousel } from 'react-bootstrap';

const Slider = props => {
  const image1 = "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  const image2 ="https://images.pexels.com/photos/6347962/pexels-photo-6347962.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";
  const image3 ="https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260";

    return (
<Carousel fade className="mb-3">
  <Carousel.Item className="d-block w-100" style={{height: '300px', backgroundImage: `url(${image1})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}>
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item className="d-block w-100" 
  style={{height: '300px', backgroundImage: `url(${image2})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}>

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item className="d-block w-100" 
  style={{height: '300px', backgroundImage: `url(${image3})`, backgroundPosition: 'center center', backgroundSize: 'cover'}}>

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    )
}

export default Slider;