import React from 'react'
import OPCDAddedCardsTr from './OPCDAddedCardsTr'

const OPCDAddedCards = ({getCardFromId,removeCard,addCard,deleteCard,getCardCount,getDeck,getDeckLeader}) => {

  const uniqueAddedCards = getDeck().filter((value, index, self) => index === self.findIndex((card) => (
    card.card_n === value.card_n
  )))

  return (
    <div>
      <table>
        <tbody>
          {(getDeckLeader()&&(
            <OPCDAddedCardsTr ley={getDeckLeader().card_n} card={getDeckLeader()} getCardFromId={getCardFromId}
            removeCard={removeCard} addCard={addCard} deleteCard={deleteCard} getCardCount={getCardCount} />
          ))}
          {uniqueAddedCards.filter(card => card.card_type === 'Character')
          .sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost))
          .map((card) => (
            <OPCDAddedCardsTr ley={card.card_n} card={card} getCardFromId={getCardFromId}
            removeCard={removeCard} addCard={addCard} deleteCard={deleteCard} getCardCount={getCardCount} />
          ))}
          {uniqueAddedCards.filter(card => card.card_type === 'Event')
          .sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost))
          .map((card) => (
            <OPCDAddedCardsTr ley={card.card_n} card={card} getCardFromId={getCardFromId}
            removeCard={removeCard} addCard={addCard} deleteCard={deleteCard} getCardCount={getCardCount} />
          ))}
          {uniqueAddedCards.filter(card => card.card_type === 'Stage')
          .sort((a, b) => parseFloat(a.cost) - parseFloat(b.cost))
          .map((card) => (
            <OPCDAddedCardsTr ley={card.card_n} card={card} getCardFromId={getCardFromId}
            removeCard={removeCard} addCard={addCard} deleteCard={deleteCard} getCardCount={getCardCount} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OPCDAddedCards