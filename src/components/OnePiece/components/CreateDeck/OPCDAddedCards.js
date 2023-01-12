import React from 'react'
import OPCDAddedCardsTr from './OPCDAddedCardsTr'

const OPCDAddedCards = ({addedCards,removeCard,addCard,deleteCard,getCardCount,getDeck,getDeckLeader}) => {

  const uniqueAddedCards = getDeck().filter((value, index, self) => index === self.findIndex((card) => (
    card.card_n === value.card_n
  )))

  return (
    <div>
      <table>
        <tbody>
          {(getDeckLeader()&&(
            <OPCDAddedCardsTr card={getDeckLeader()}
            removeCard={removeCard} addCard={addCard} deleteCard={deleteCard} getCardCount={getCardCount} />
          ))}
          {uniqueAddedCards.filter(card => card.card_type === 'Character')
          .sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost))
          .map((card) => (
            <OPCDAddedCardsTr card={card}
            removeCard={removeCard} addCard={addCard} deleteCard={deleteCard} getCardCount={getCardCount} />
          ))}
          {uniqueAddedCards.filter(card => card.card_type === 'Event')
          .sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost))
          .map((card) => (
            <OPCDAddedCardsTr card={card}
            removeCard={removeCard} addCard={addCard} deleteCard={deleteCard} getCardCount={getCardCount} />
          ))}
          {uniqueAddedCards.filter(card => card.card_type === 'Stage')
          .sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost))
          .map((card) => (
            <OPCDAddedCardsTr card={card}
            removeCard={removeCard} addCard={addCard} deleteCard={deleteCard} getCardCount={getCardCount} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OPCDAddedCards