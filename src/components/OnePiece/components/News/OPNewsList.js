import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../../../../firebase';
import {Link} from 'react-router-dom';
import { Row, Col, Image, Container} from 'react-bootstrap';
import OPNewsListItem from './OPNewsListItem';

function OPNewsList() {
  const [news, setNews] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/op/news/news`)), (snapshot) => {
      setNews(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  })

  return (
    <Container>
      <div><h1>News</h1></div>
      {(news !== []) ? (
          <Row>
            {news.map((newItem) => (
              <OPNewsListItem newItem={newItem} />
            ))}
          </Row>
          
      ) : (
        <div class="d-flex justify-content-center">
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </Container>
);
}

export default OPNewsList;