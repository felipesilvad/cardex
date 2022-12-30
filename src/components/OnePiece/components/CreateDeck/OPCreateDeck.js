import React, { useState, useEffect } from 'react'
import {Form,Button,Row,Alert,Container,Col,Image} from "react-bootstrap"
import {doc,setDoc,query,collection,onSnapshot,where} from "firebase/firestore";
import db from '../../../../firebase';
import OPSearch from '../Search/OPSearch';
const OPCreateDeck = () => {
  const addedCards = []
  const addCard = (card) => {
    addedCards.push(card)
    console.log(addedCards)
  }

  return (
    <>
      <div className='cd__bg'>
        {addedCards}
      </div>
      <OPSearch cd={true} addCard={addCard} />
    </>
  )
}

export default OPCreateDeck