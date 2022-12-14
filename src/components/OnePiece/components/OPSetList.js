import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../../../firebase';
import {Link, useParams} from 'react-router-dom';
import { Row, Col, Image, Container} from 'react-bootstrap';
import {} from 'react-bootstrap';


function OPSet() {
  const id = useParams().id
  const [sets, setSets] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/op/sets/sets`)), (snapshot) => {
      setSets(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [id])

  return (
    <Container>
      <div><h1>Sets List</h1></div>
      <Row className='bg-Gray'>
        {(sets !== []) ? (
          sets.map((set) => (
            <Col md={6}>
              <div className='m-1'>
                <Link to={`/one-piece/set/${set.id}`}>
                  <div className='mt-2'>
                    <span className='card__field d-flex set-list__txt'>
                      <h4>{set.id}{' - '}</h4>
                      <h3 className='mx-1 mb-1'>{set.title}</h3>
                    </span>
                  </div>
                  <Image className='set-list_img' src={set.img_cut} />
                </Link>
              </div>
            </Col>
          ))
        ) : (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </Row>
    </Container>
);
}

export default OPSet;