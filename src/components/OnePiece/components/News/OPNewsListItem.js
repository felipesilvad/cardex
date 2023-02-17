import React from 'react';
import {Col} from 'react-bootstrap';
import OPNewsBlock from './OPNewsBlock';

function OPNewsListItem({newItem}) {
  return (
    <Col md={4}>
      <OPNewsBlock newItem={newItem} />
    </Col>
);
}

export default OPNewsListItem;