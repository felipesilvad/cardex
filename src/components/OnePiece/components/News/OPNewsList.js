import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../../../../firebase';
import {Link} from 'react-router-dom';
import { Row, Col, Image, Container} from 'react-bootstrap';

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
          news.map((newItem) => (
            <div>
              <Link to={`/one-piece/news/${newItem.id}`}>
                <h1>{newItem.title}</h1>
              </Link>
            </div>
          ))
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