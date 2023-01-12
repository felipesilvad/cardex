import React, { useState } from 'react'
import {Row,Col,Button,Form,Modal} from 'react-bootstrap';
import OPSearch from '../Search/OPSearch';
import OPCDAddedCards from './OPCDAddedCards'
import {collection,addDoc} from "firebase/firestore";
import db from '../../../../firebase';
import { UserAuth } from '../../../../contexts/AuthContext'


const OPCreateDeck = () => {
  const {user} = UserAuth()
  const [addedCards, setAddedCards] = useState([]);
  const [error, setError] = useState([]);
  const [deckTitle, setDeckTitle] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCardCount = (card_n) => {
    return addedCards.filter((card) => card.card_n === card_n).length
  }

  const getDeck = () => {
    return addedCards.filter((card) => card.card_type !== "Leader")
  }

  const clearDeck = () => {
    setAddedCards([])
  }

  const getDeckLeader = () => {
    if (addedCards.filter((card) => card.card_type === "Leader")) {
      return addedCards.filter((card) => card.card_type === "Leader")[0]
    } else {return false}
  }

  const actuallyAddCard = (card,art) => {
    if (getDeckLeader()) {
      if (getDeckLeader().color.includes(card.color_1) || getDeckLeader().color.includes(card.color_2)) {
        setAddedCards([...addedCards,{card_n:card.card_n,art:art,cost:card.cost,title:card.title,color:card.color,color_1:card.color_1,color_2:card.color_2,card_type:card.card_type}])
      } else {
        setError(['warning',"The card doesn't match your Leader's Colors"])
        setAddedCards([...addedCards,{card_n:card.card_n,art:art,cost:card.cost,title:card.title,color:card.color,color_1:card.color_1,color_2:card.color_2,card_type:card.card_type}])
      }
    } else {
      setAddedCards([...addedCards,{card_n:card.card_n,art:art,cost:card.cost,title:card.title,color:card.color,color_1:card.color_1,color_2:card.color_2,card_type:card.card_type}])
    }
  }

  const addCard = (card,art) => {
    setError('')
    if (card.card_type === 'Leader') {
      if(addedCards.some(card => card.card_type === 'Leader')) {
        setError(['danger',"You already have a Leader in your Deck"])
      } else {
        actuallyAddCard(card,art)
      }
    } else {
      if (card.copies_limit) {
        if (getCardCount(card.card_n) >= card.copies_limit){
          setError(['danger',"You can't add more copies of this card"])
        } else{
          actuallyAddCard(card,art)
        }
      } else {
        if (getCardCount(card.card_n) >= 4){
          setError(['danger',"You can't add more copies of this card"])
        } else{
          actuallyAddCard(card,art)
        }
      }
    }
  }

  const removeCard = (card_n) => {
    setError('')
    function checkCard(card) {return card.card_n === card_n}
    setAddedCards(addedCards.filter((card,index) => index !== addedCards.findIndex(checkCard)))
  }

  const deleteCard = (card_n) => {
    setError('')
    setAddedCards(addedCards.filter(card => card.card_n !== card_n))
  }

  const saveDeck = () =>{
    const newDate = new Date()
    addDoc(collection(db, "op/decks/decks"), 
    {cards: addedCards, title: deckTitle, createdBy:user.uid, createdAt: newDate})
    handleShow()
  }


  return (
    <Row className='mx-3'>
      <Col md={3} className='cd__bg bg-dblue-t '>
        <div className='save-deck-bg m-2 p-2'>
          <div>
            <Form.Control className='search-bar' placeholder="Deck Title" 
              onChange={e => setDeckTitle(e.target.value)}
            />
          </div>
          <div className='m-2 d-flex justify-content-around'>
            <Button className='cd_button' onClick={() => clearDeck()}>CLEAR</Button>
            <Button className='cd_button' onClick={() => saveDeck()}>SAVE</Button>
          </div>
        </div>
        
        <div>
          {error&&(
            <div class={`alert alert-${error[0]}`} role="alert">
              {error[1]}
            </div>
          )}
          <OPCDAddedCards addedCards={addedCards} getDeckLeader={getDeckLeader} getDeck={getDeck}
          removeCard={removeCard} addCard={addCard} deleteCard={deleteCard} getCardCount={getCardCount} /> 
        </div>        
      </Col>
      <Col md={9}>
        <OPSearch cd={true} addCard={addCard} />
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deck Added</Modal.Title>
        </Modal.Header>
      </Modal>
    </Row>
  )
}

export default OPCreateDeck