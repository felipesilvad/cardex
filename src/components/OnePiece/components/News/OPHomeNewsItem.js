import React from 'react';
import {Col,Carousel} from 'react-bootstrap';
import OPNewsBlock from './OPNewsBlock';

function OPHomeNewsItem({newItem}) {
  return (
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="holder.js/800x400?text=First slide&bg=373940"
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
);
}

export default OPHomeNewsItem;