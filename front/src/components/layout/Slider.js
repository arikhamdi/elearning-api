import React, { Component } from 'react'

import { Carousel } from 'react-bootstrap';

const Slider = props => {

    return (
<Carousel fade className="mb-3">
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://cdn.pixabay.com/photo/2017/03/05/00/34/panorama-2117310_1280.jpg"
      alt="First slide"
    />
    <Carousel.Caption>
      <h3>First slide label</h3>
      <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://cdn.pixabay.com/photo/2015/10/12/15/01/coastline-984088_1280.jpg"
      alt="Second slide"
    />

    <Carousel.Caption>
      <h3>Second slide label</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </Carousel.Caption>
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src="https://cdn.pixabay.com/photo/2017/06/15/16/50/panorama-2405958_1280.jpg"
      alt="Third slide"
    />

    <Carousel.Caption>
      <h3>Third slide label</h3>
      <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
    </Carousel.Caption>
  </Carousel.Item>
</Carousel>
    )
}

export default Slider;