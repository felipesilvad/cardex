import React from 'react'
import {Button} from "react-bootstrap"
import {BsTrashFill} from 'react-icons/bs';

const OPCDAddedCardsTr = ({card,getCardCount,addCard,removeCard,deleteCard}) => {

  return (
    <tr key={card.card_n} className="cd__added-card__tr ">
      {(card.card_type === "Leader") ? (<td className='th-border px-2 bg-black'><b>{card.cost}</b></td>) : ('')}
      {(card.card_type === "Character") ? (<td className='th-border px-2'><b>{card.cost}</b></td>) : ('')}
      {(card.card_type === "Event") ? (<td className='th-border px-2 bg-event'>{card.cost}</td>) : ('')}
      {(card.card_type === "Stage") ? (<td className='th-border px-2 bg-Light-t'><b>{card.cost}</b></td>) : ('')}
      {(card.color_2 ? (
        <td className={`px-1 w-100 ${(card.card_type === "Leader") ? ('Leader-tr') : ('')}
        bg-${card.color_1}-${card.color_2}`} >
          {card.card_n} - {card.title}
        </td>) : (
        <td className={`px-1 w-100 ${(card.card_type === "Leader") ? ('Leader-tr') : ('')}
        bg-${card.color}`}>{card.card_n} - {card.title}</td>
      ))}    
      <td className={`px-2 ${(card.card_type === "Leader") ? ('bg-black') : ('')}`}>{getCardCount(card.card_n)}x</td>
      <td><Button className='cd_button' onClick={() => addCard(card)}>+</Button></td>
      <td><Button className='cd_button' onClick={() => removeCard(card.card_n)}>-</Button></td>
      <td><Button className='cd_button w-100' onClick={() => deleteCard(card.card_n)}><BsTrashFill /></Button></td>
    </tr>
  )
}

export default OPCDAddedCardsTr