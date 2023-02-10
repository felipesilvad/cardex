import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, doc } from 'firebase/firestore';
import db from '../../../../firebase';
import {useParams} from 'react-router-dom';
import {Container, Col, Row} from 'react-bootstrap';
import OPNewsContent from './OPNewsContent';

function OPNews() {
  const id = useParams().id
  const [cards, setCards] = useState([])
  const [news, setNews] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/op/cards/cards`)), (snapshot) => {
      setCards(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    onSnapshot(doc(db, "/op/news/news/", id), (doc) => {
      setNews(doc.data());
    });
  }, [id])

  return (
    <Container>
      <Row>
        <Col md={9}>
          <div className='bg-dblue-t rounded p-2'>
            {news&&(news.title)}
            {news&&(news.content&&(news.content.map((content) => (
              <OPNewsContent content={content} cards={cards}/>
            ))))}
          </div>
        </Col>
        <Col md={3}>
          Other News
        </Col>
      </Row>
      
    </Container>
);
}

export default OPNews;