import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import db from '../../../../firebase';
import {useParams} from 'react-router-dom';
import {Container, Row,Col} from 'react-bootstrap';

function OPDeck() {
  const id = useParams().id
  const [deck, setDeck] = useState([])
  
  useEffect(() => {
    onSnapshot(doc(db, "/op/decks/decks/", id), (doc) => {
      setDeck(doc.data());
    });
  }, [id]);


  return (
    <Container>
      {deck.title}
    </Container>
);
}

export default OPDeck;