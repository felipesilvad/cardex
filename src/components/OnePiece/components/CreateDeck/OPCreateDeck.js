import React, { useState } from 'react'
import {Row,Col} from 'react-bootstrap';
import OPSearch from '../Search/OPSearch';
import OPCDAddedCards from './OPCDAddedCards'


const OPCreateDeck = () => {
  const [addedCards, setAddedCards] = useState([]);

  const addCard = (card) => {
    setAddedCards([...addedCards, {card_n:card.card_n, cost:card.cost, title:card.title,
    color: card.color, color_1:card.color_1, color_2:card.color_2, card_type:card.card_type}])
    console.log(addedCards)
  }

  const removeCard = (card_n) => {
    function checkCard(card) {return card.card_n === card_n}
    setAddedCards(addedCards.filter((card,index) => index !== addedCards.findIndex(checkCard)))
  }

  const deleteCard = (card_n) => {
    setAddedCards(addedCards.filter(card => card.card_n !== card_n))
  }


  return (
    <>
      <div className='cd__bg'>
        <Row>
          <Col md={4}>
            <OPCDAddedCards addedCards={addedCards} 
            removeCard={removeCard} addCard={addCard} deleteCard={deleteCard} /> 
          </Col>
        </Row>        
      </div>
      <OPSearch cd={true} addCard={addCard} />
    </>
  )
}

export default OPCreateDeck