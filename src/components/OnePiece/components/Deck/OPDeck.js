import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, query, collection } from 'firebase/firestore';
import db from '../../../../firebase';
import {useParams} from 'react-router-dom';
import {Container, Row,Col} from 'react-bootstrap';
import  OPDeckCreatedBy from './OPDeckCreatedBy'
import OPCostChart from './Charts/OPCostChart';
import OPColorChart from './Charts/OPColorChart';
import OPTypeChart from './Charts/OPTypeChart';
import OPDeckCardGallery from './OPDeckCardGallery';
import OPDeckCardLeader from './OPDeckCardLeader';

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
  const uniqueDeckCards = deckCards.filter((value, index, self) => value.card_type !== "Leader" &&
  index === self.findIndex((card) => (
    card.card_n === value.card_n
  )))

  const getCardCount = (card_n) => {
    return deckCards.filter((card) => card.card_n === card_n).length
  }
  const getCardArt = (card_n) => {
    return deck.cards.filter((card) => card.id === card_n)[0].art
  }

  const getDeckLeader = () => {
    return deckCards.filter((card) => card.card_type === "Leader")[0]
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
            {deckCards&&(
              <OPTypeChart deckCards={deckCards} />
            )}
          </Col>
          <Col className='d-none d-md-block'>
            {deckCards&&(
              <OPColorChart deckCards={deckCards} />
            )}
          </Col>
          <Col className='d-none d-md-block'>
            {deckCards&&(
              <OPCostChart deckCards={deckCards} />
            )}
          </Col>
        </Row>
      </div>
      
      <Row className='mt-2'>
        <Col md={3}>
          <OPDeckCardLeader leader={getDeckLeader()} getCardCount={getCardCount} getCardArt={getCardArt} />
        </Col>
        <Col md={9}>
          {!!uniqueDeckCards&&(
            <OPDeckCardGallery cards={uniqueDeckCards.sort((a,b) => (a.cost - b.cost))} getCardCount={getCardCount} getCardArt={getCardArt} />
          )}
        </Col>
      </Row>
      
    </Container>
);
}

export default OPDeck;