import React, { useState, useEffect } from 'react'
import {Button} from "react-bootstrap"
import {doc,setDoc,query,collection,onSnapshot,where} from "firebase/firestore";
import db from '../../../../firebase';
import {BsTrashFill} from 'react-icons/bs';

const OPCDAddedCards = ({addedCards,removeCard,addCard,deleteCard}) => {

  const uniqueAddedCards = addedCards.filter((value, index, self) => index === self.findIndex((card) => (
    card.card_n === value.card_n
  )))

  const getCardCount = (card_n) => {
    return addedCards.filter((card) => card.card_n === card_n).length
  }
  
  return (
    <div>
      <table>
        <tbody>
          {uniqueAddedCards.map((card) => (
            <tr key={card.card_n}>
              <td className='th-border'><b>{card.cost}</b></td>
              {(card.color_2 ? (
                <td className={` bg-${card.color_1}-${card.color_2}`} >
                  {card.card_n} - {card.title}
                </td>) : (
                <td className={` bg-${card.color}`}>{card.card_n} - {card.title}</td>
              ))}    
              {(card.card_type === "Leader") ? (<td className=' bg-dark'>{card.card_type}</td>) : ('')}
              {(card.card_type === "Character") ? (<td className=''>{card.card_type}</td>) : ('')}
              {(card.card_type === "Stage") ? (<td className=''>{card.card_type}</td>) : ('')}
              {(card.card_type === "Event") ? (<td className=' bg-event'>{card.card_type}</td>) : ('')}
              <td>{getCardCount(card.card_n)}x</td>
              <td><Button onClick={() => addCard(card)}>+</Button></td>
              <td><Button onClick={() => removeCard(card.card_n)}>-</Button></td>
              <td><Button onClick={() => deleteCard(card.card_n)}><BsTrashFill /></Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default OPCDAddedCards