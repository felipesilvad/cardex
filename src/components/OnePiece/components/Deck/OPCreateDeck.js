import React, { useState,useEffect } from 'react'
import {Button,Form,Modal,Row,Col} from 'react-bootstrap';
import OPSearch from '../Search/OPSearch';
import OPCDAddedCards from './OPCDAddedCards'
import {collection,addDoc,query,onSnapshot} from "firebase/firestore";
import db from '../../../../firebase';
import { UserAuth } from '../../../../contexts/AuthContext'

const OPCreateDeck = () => {
  const {user} = UserAuth()
  const [cards, setCards] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/op/cards/cards`)), (snapshot) => {
      setCards(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])
  const [addedCards, setAddedCards] = useState([]);
  const [error, setError] = useState('');
  const [deckTitle, setDeckTitle] = useState('');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showClearModal, setShowClearModal] = useState(false);
  const handleOpenClearModal = () => setShowClearModal(true);
  const handleCloseClearModal = () => setShowClearModal(false);

  const getCardCount = (card_n) => {return addedCards.filter((card) => card.card_n === card_n).length}

  const getDeck = () => {return addedCards.filter((card) => card.card_type !== "Leader")}

  const clearDeck = () => {
    setAddedCards([])
    handleCloseClearModal()
  }

  const getDeckLeader = () => {
    if (addedCards.filter((card) => card.card_type === "Leader")) {
      return addedCards.filter((card) => card.card_type === "Leader")[0]
    } else {return false}
  }

  const checkDeckCardColors = () => {
    const color1Check = addedCards.filter(card => (card.color_1 !== getDeckLeader().color_1 && card.color_1 !== getDeckLeader().color_2 && card.color_1 !== ""))
    const color2Check = addedCards.filter(card => (card.color_2 && card.color_2 !== getDeckLeader().color_1 && card.color_2 !== getDeckLeader().color_2 && card.color_2 !== ""))
    return (color1Check.length + color2Check.length)
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

  const [showImportModal, setShowImportModal] = useState(false);
  const handleOpenImportModal = () => setShowImportModal(true);
  const handleCloseImportModal = () => setShowImportModal(false);
  const [importTextArea, setImportTextArea] = useState('');
  const [importType, setImportType] = useState('List');

  const importDeck = () => {
    const addedCardsImport = []
    const lines = importTextArea.split('\n');
    lines.forEach(line => {
      for (let i = 0; i < line.split(' ')[0]; i++) {
        const card = cards.filter((card) => card.card_n === line.split(' ')[1])
        if (card) {
          addedCardsImport.push({card_n:card[0].card_n,art:'',cost:card[0].cost,title:card[0].title,color:card[0].color,color_1:card[0].color_1,color_2:card[0].color_2,card_type:card[0].card_type})
        } else (console.log('no cards found'))
      }
    });
    // for (const id of array) {
    //   const card = cards.filter((card) => card.card_n === id)
    //   if (card) {
    //     addedCardsImport.push({card_n:card[0].card_n,art:'',cost:card[0].cost,title:card[0].title,color:card[0].color,color_1:card[0].color_1,color_2:card[0].color_2,card_type:card[0].card_type})
    //   } else (console.log('no cards found'))
    // }
    setAddedCards(addedCardsImport)
    handleCloseImportModal()
  }

  const saveDeck = () =>{
    const newDate = new Date()
    if (deckTitle) {
      if (addedCards.length !== 51) {
        if (addedCards.length > 51) {setError(['danger',"Exceeded limit of cards in the Deck"])}
        if (addedCards.length < 51) {setError(['danger',`${Math.abs(addedCards.length - 51)} Cards left to complete the Deck`])}
      } else {
        if (checkDeckCardColors() === 0) {
          addDoc(collection(db, "op/decks/decks"), 
          {cards: addedCards, title: deckTitle, createdBy:user.uid, createdAt: newDate, leader: getDeckLeader()})
          handleShow()
        } else {setError(['danger',`${checkDeckCardColors()} card doesn't match the Leader Colors`])}
      }
    } else {setError(['danger',"Deck Title is empty"])}
  }


  return (
    <div>
      <div className='cd__bg bg-dblue-t '>

        <div className='save-deck-bg m-1 p-1 d-flex'>
            <Form.Control className='search-bar mr-1 w-100' placeholder="Deck Title" 
              onChange={e => setDeckTitle(e.target.value)}
            />
            <Button className='mx-1 cd_button' onClick={() => handleOpenClearModal()}>CLEAR</Button>
            <Button className='mx-1 cd_button' onClick={() => handleOpenImportModal()}>IMPORT</Button>
            <Button className='ml-1 cd_button' onClick={() => saveDeck()}>SAVE</Button>
        </div>

        <div className='bg-Gray d-flex justify-content-center mb-1'>
          <h5 className='m-1 p-2'>CARDS ADDED: {addedCards.length}</h5>
          <div className={`m-1 p-2 alert alert-${error&&(error[0])}`} role="alert">
            {error&&(`${error[1]}`)}
          </div>
        </div>

        <div className='scrollbar scrollbar-primary search-overflow gallery-vh'>
          <OPCDAddedCards addedCards={addedCards} getDeckLeader={getDeckLeader} getDeck={getDeck}
          removeCard={removeCard} addCard={addCard} deleteCard={deleteCard} getCardCount={getCardCount} /> 
        </div>
      </div>
      <div className='cd__search-bg'>
        <OPSearch cd={true} addCard={addCard} getCardCount={getCardCount} removeCard={removeCard} />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Deck Added</Modal.Title>
        </Modal.Header>
      </Modal>

      <Modal className='confirm_modal p-2' show={showClearModal} onHide={handleCloseClearModal}>
        <div className='card_modal__bg'>
          <h4 className="text-uppercase">This will Delete all the cards added to your Deck</h4>
          <Button className='m-1 cd_button' onClick={() => clearDeck()}>CONFIRM</Button>
        </div>
      </Modal>

      <Modal className='confirm_modal p-2' show={showImportModal} onHide={handleCloseImportModal}>
        <div className='card_modal__bg'>
          <h4 className="text-uppercase">Import Deck</h4>
          <Row className='mb-3'>
            <Col xs={6}>
              <div className={`mx-1 h-100 import-select${(importType === 'List') ? ('-active') : ('')}`}
              onClick={() => setImportType('List')}>
                <b className='import-select_txt'>Text List</b>
                <span className='import-select-ex'>
                  <br />Example:<br />
                  1 ST01-001 Monkey D. Luffy<br />
                  4 ST01-006 Tony Tony Chopper<br />
                  4 ST01-007 Nami<br />
                  4 ST01-002 Usopp ...
                </span>
              </div>
              
            </Col>
            <Col xs={6}>
            <div className={`mx-1 h-100 import-select${(importType === 'TTS') ? ('-active') : ('')}`}
            onClick={() => setImportType('TTS')}>
                <b className='import-select_txt'>Table Top Simulator</b>
                <span className='import-select-ex'>
                  <br />Example:<br />
                  {'["ST01-001","ST01-002","ST01-002","ST01-002","ST01-002","ST01-003","ST01-003","ST01-003","ST01-003",...]'}
                </span>
              </div>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            {/* <Form.Label >Example textarea</Form.Label> */}
            <Form.Control onChange={(e) => setImportTextArea(e.target.value)} as="textarea" rows={10} />
          </Form.Group>
          <Button className='m-1 cd_button' onClick={() => importDeck()}>CONFIRM</Button>
        </div>
      </Modal>

    </div>
  )
}

export default OPCreateDeck