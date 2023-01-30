import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, where, doc } from 'firebase/firestore';
import db from '../../../../firebase';
import {useParams} from 'react-router-dom';
import {Container, Row,Col} from 'react-bootstrap';
import {Form,} from 'react-bootstrap';
import OPDeckListItem from './OPDeckListItem'

function OPDeckList() {
  const [decks, setDecks] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/op/decks/decks`)), (snapshot) => {
      setDecks(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [decks])

  return (
    <Container>
      <Row>
        {decks.map((deck) => (
          <OPDeckListItem deck={deck} />
        ))}
      </Row>
    </Container>
);
}

export default OPDeckList;