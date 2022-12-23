import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../../../../firebase';
import {Container, Button} from 'react-bootstrap';
import {Row,Col,Spinner,Form} from 'react-bootstrap';
import OPSetCardGallery from '../Set/OPSetCardGallery';
import OPSetCardTable from '../Set/OPSetCardTable';
import Select from 'react-select'

function OPSearch() {
  const [cards, setCards] = useState([])
  const [view, setView] = useState('Gallery')
  const [loading, setLoaging] = useState(false)

  useEffect (() => {
    onSnapshot(query(collection(db, `/op/cards/cards`)), (snapshot) => {
      setCards(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // ATTRIBUTE
  const [att, setAtt] = useState('');
  const attOptions = [
    { value: '', label: 'Any' },
    { value: 'Strike', label: 'Strike' },
    { value: 'Ranged', label: 'Ranged' },
    { value: 'Special', label: 'Special' },
    { value: 'Wisdom', label: 'Wisdom' },
    { value: 'Slash', label: 'Slash' },
  ]
  async function reloadFilterAtt(value) {
    setLoaging(true)
    setAtt(value)
    await sleep(400);
    setLoaging(false)
  }
  function filterAtt(card) {
    if (att === "") {return true}
    else {return card.attribute === att}
  }

  // CARD TYPE
  const [type, setType] = useState('');
  const typeOptions = [
    { value: '', label: 'Any' },
    { value: 'Leader', label: 'Leader' },
    { value: 'Character', label: 'Character' },
    { value: 'Event', label: 'Event' },
    { value: 'Stage', label: 'Stage' },
  ]
  async function reloadFilterType(value) {
    setLoaging(true)
    setType(value)
    await sleep(400);
    setLoaging(false)
  }
  function filterType(card) {
    if (type === "") {return true} 
    else {return card.card_type === type}
  }

  // COLOR
  const [colors, setColors] = useState([]);
  const [colorParam, setColorParam] = useState('||');
  async function reloadFilterColors(value) {
    setLoaging(true)
    console.log(colors.length)
    if (colors.includes(value)) {
      const index = colors.indexOf(value);
      if (index > -1) {colors.splice(index, 1)}
    } else {
      if (colors.length > 1) {
        colors.splice(0, 2)
        colors.push(value)
        console.log('inside',colors, colors.length)
      } else {colors.push(value)}
    }
    await sleep(400);
    setLoaging(false)
    console.log(colors, colorParam)
  }
  function filterColor(card) {
    if (colors.length === 0) {
      return true
    }
    if (colors.length === 1) {
      return card.color === colors[0] || card.color_1 === colors[0] || card.color_2 === colors[0]
    }
    if (colors.length === 2) {
      if (colorParam === "||") {
        return (card.color === colors[0] || card.color_1 === colors[0] || card.color_2 === colors[0])
        || (card.color === colors[1] || card.color_1 === colors[1] || card.color_2 === colors[1])
      }
      if (colorParam === "&&") {
        return (card.color === colors[0] || card.color_1 === colors[0] || card.color_2 === colors[0])
        && (card.color === colors[1] || card.color_1 === colors[1] || card.color_2 === colors[1])
      }
    }
  }

  // ALT ART
  const [altArt, setAltArt] = useState(false);
  async function reloadFilterAltArt() {
    setLoaging(true)
    setAltArt(!altArt)
    await sleep(400);
    setLoaging(false)
  }
  function filterAltArt(card) {
    return card.img_P1
  }

  return (
    <Container>
      <h1>Card Search</h1>
      <div className='bg-Gray rounded'>
        <Row>
          <Col className='px-2'>
            <label>Attribute</label>
            <Select 
              options={attOptions} onChange={e => reloadFilterAtt(e.value)}
              className="Selector" defaultValue={{label: "Any", value: 'Any'}}
            />
          </Col>
          <Col className='px-2'>
            <label>Card Type</label>
            <Select 
              options={typeOptions} onChange={e => reloadFilterType(e.value)}
              className="Selector" defaultValue={{label: "Any", value: 'Any'}}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6} className='px-2'>
            <label>Color</label>
            <div className='d-flex'>
              <div>
                <Button className={`search__btn border-Red
                ${(colors.includes('Red') ? ('bg-Red') : ('bg-Gray color-Red'))}`}
                onClick={() => reloadFilterColors('Red')}>Red</Button>
                <Button className={`search__btn border-Green
                ${(colors.includes('Green') ? ('bg-Green') : ('bg-Gray color-Green'))}`}
                onClick={() => reloadFilterColors('Green')}>Green</Button>
                <Button className={`search__btn border-Blue
                ${(colors.includes('Blue') ? ('bg-Blue') : ('bg-Gray color-Blue'))}`}
                onClick={() => reloadFilterColors('Blue')}>Blue</Button>
                <Button className={`search__btn border-Purple
                ${(colors.includes('Purple') ? ('bg-Purple') : ('bg-Gray color-Purple'))}`}
                onClick={() => reloadFilterColors('Purple')}>Purple</Button>
              </div>
              {(colors.length === 2) ? (
                <div className='bg-Light rounded mx-4 mb-1'>
                  <Button className={`search__btn border-${colors[0]} bg-${colors[0]}`}>{colors[0]}</Button>
                  <select className='rounded mt-1' onChange={e => setColorParam(e.target.value)}>
                    <option key="1" value={"||"} selected={(colorParam === "||") ? ("selected") : ('')}>OR</option>
                    <option key="2" value={"&&"} selected={(colorParam === "&&") ? ("selected") : ('')}>AND</option>
                  </select>
                  <Button className={`search__btn border-${colors[1]} bg-${colors[1]}`}>{colors[1]}</Button>
                </div>
              ) : ('')}
            </div>
          </Col>
          <Col>
            <Form>
              <Form.Check type="switch"d="custom-switch"label="Alternate Art"
              onClick={reloadFilterAltArt}/>
            </Form>
          </Col>
        </Row>
        
      </div>
      <div className='d-flex justify-content-around'>
        {(view === "Gallery" ? (
          <Button className='imgBtn set__view-btn view-btn-active' onClick={() => setView('Gallery')}>Gallery</Button>):(
          <Button className='imgBtn set__view-btn' onClick={() => setView('Gallery')}>Gallery</Button>
        ))}
        {(view === "Table" ? (
          <Button className='imgBtn set__view-btn view-btn-active' onClick={() => setView('Table')}>Table</Button>):(
          <Button className='imgBtn set__view-btn' onClick={() => setView('Table')}>Table</Button>
        ))}
      </div>
      {(!loading &&(
        (view === "Gallery" ? (
          <div className='d-flex flex-wrap'>
            <OPSetCardGallery altArt={altArt} cards={cards
              .filter(filterAtt)
              .filter(filterType)
              .filter(filterColor)
              .filter(filterAltArt)
            } />
          </div>
        ) : (
          <OPSetCardTable cards={cards
            .filter(filterAtt)
            .filter(filterType)
            .filter(filterColor)
            .filter(filterAltArt)
          } />
        ))
      ))}
      {(loading &&(
        <div className='bg-Gray p-2 text-center'>
          <Spinner animation="border" variant="danger" />
        </div>
      ))}

    </Container>
);
}

export default OPSearch;