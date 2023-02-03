import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, query, collection, where } from 'firebase/firestore';
import db from '../../../../firebase';
import {useParams} from 'react-router-dom';
import {Container, Row,Col} from 'react-bootstrap';
import  OPDeckCreatedBy from './OPDeckCreatedBy'
import OPCostChart from './Charts/OPCostChart';

function OPDeck() {
  const id = useParams().id
  const [deck, setDeck] = useState([])
  const [cards, setCards] = useState([])
  
  useEffect(() => {
    onSnapshot(doc(db, "/op/decks/decks/", id), (doc) => {
      setDeck(doc.data());
    });
  }, [id]);

  useEffect (() => {
    onSnapshot(query(collection(db, `/op/cards/cards`)), (snapshot) => {
      setCards(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  const deckCards = []
  if (deck.cards && cards) {
    deck.cards.map(deckCard => (
      deckCards.push(cards.filter(card => card.id === deckCard.id)[0])
    ))
  }

  return (
    <Container>
      <div className='bg-Gray rounded p-2 mt-2'>
        <div className=''>
          <h2>{deck.title}</h2>
          {deck.createdBy &&(<OPDeckCreatedBy id={deck.createdBy} createdAt={deck.createdAt} />)}
        </div>
        <Row>
          <Col>
          </Col>
          <Col>
            <OPCostChart deckCards={deckCards} />
          </Col>
        </Row>
      </div>
      
    </Container>
);
}

export default OPDeck;