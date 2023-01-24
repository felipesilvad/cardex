import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../../../../firebase';
import {Row,Col,Form,Button,Container} from 'react-bootstrap';
import {useLocation} from 'react-router-dom';
import OPSearchSelect from './OPSearchSelect'
import OPSearchView from './OPSearchView';

function OPSearch({cd,addCard,getCardCount,removeCard}) {
  const [cards, setCards] = useState([])
  const [loading, setLoaging] = useState(false)
  useEffect (() => {
    onSnapshot(query(collection(db, `/op/cards/cards`)), (snapshot) => {
      setCards(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  }, [])
  
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // MAIN
  const location = useLocation()
  const [main, setMain] = useState('')
  useEffect (() => {
    if (location.state) {
      setMain(location.state.search)
    }
  }, [location])
  async function reloadFilterMain(value) {
    setLoaging(true)
    setMain(value)
    await sleep(400);
    setLoaging(false)
  }
  function filterMain(card) {
    if (main === "") {return true}
    else if (card.title_clean.toLowerCase().includes(main.toLowerCase()) && !card.card_n.toLowerCase().includes(main.toLowerCase()))
    {return card.title_clean.toLowerCase().includes(main.toLowerCase())}
    else if (!card.title_clean.toLowerCase().includes(main.toLowerCase()) && card.card_n.toLowerCase().includes(main.toLowerCase()))
    {return card.card_n.toLowerCase().includes(main.toLowerCase())}
    else if (card.title_clean.toLowerCase().includes(main.toLowerCase()) && card.card_n.toLowerCase().includes(main.toLowerCase()))
    {return card.card_n.toLowerCase().includes(main.toLowerCase()) && card.card_n.toLowerCase().includes(main.toLowerCase())}
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
  useEffect(() => {
    if (cd) {
      setType('Leader')
      const $select = document.querySelector('#card_type')
      $select.value = 'Leader'
      $select.label = 'Leader'
    }
  }, [cd]);
  const resetCardType = () => {
    setType('')
    const $select = document.querySelector('#card_type')
    $select.value = ''
    $select.label = 'Any'
  }

  // CARD RARITY
  const [rarity, setRarity] = useState('');
  const rarityOptions = [
    { value: '', label: 'Any' },
    { value: 'C', label: 'C - Common' },
    { value: 'U', label: 'U - Uncommon' },
    { value: 'R', label: 'R - Rare' },
    { value: 'SR', label: 'SR - Super Rare' },
    { value: 'SEC', label: 'SEC - Secret Rare' },
    { value: 'L', label: 'L - Leader' },

  ]
  async function reloadFilterRarity(value) {
    setLoaging(true)
    setRarity(value)
    await sleep(400);
    setLoaging(false)
  }
  function filterRarity(card) {
    if (rarity === "") {return true} 
    else {return card.rarity === rarity}
  }

  // COLOR
  const [colors, setColors] = useState([]);
  const [colorParam, setColorParam] = useState('||');
  async function reloadFilterColors(value) {
    setLoaging(true)
    if (colors.includes(value)) {
      const index = colors.indexOf(value);
      if (index > -1) {colors.splice(index, 1)}
    } else {
      if (colors.length > 1) {
        colors.splice(0, 2)
        setColors(colors => [...colors, value])
      } else {setColors(colors => [...colors, value])}
    }
    await sleep(400);
    setLoaging(false)
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
  const [showAA, setShowAA] = useState(true)
  async function reloadFilterAltArt() {
    setLoaging(true)
    setAltArt(!altArt)
    if(!altArt) {setShowAA(true)}
    await sleep(400)
    setLoaging(false)
  }
  function filterAltArt(card) {
    if (altArt) {return card.img_P1}
    else {return true}
  }

  // CARD COST
  const [cost, setCost] = useState('');
  async function reloadFilterCost(value) {
    setLoaging(true)
    setCost(value)
    await sleep(400);
    setLoaging(false)
  }
  function filterCost(card) {
    if (cost === "") {return true} 
    else {return card.cost === parseInt(cost)}
  }

  // CARD POWER
  const [power, setPower] = useState('');
  async function reloadFilterPower(value) {
    setLoaging(true)
    setPower(value)
    await sleep(400);
    setLoaging(false)
  }
  function filterPower(card) {
    if (power === "") {return true} 
    else {return card.power === parseInt(power)}
  }


  return (
    <Container
      className={cd&&('cd__search-container mx-2')}
    >
      <div className="search-bg">
        {/* <h1>Card Search</h1> */}
        <div className='bg-Gray rounded'>
          <Form.Control className='search-bar' placeholder="Search" 
          onChange={e => reloadFilterMain(e.target.value)}
          />
          <Row>
            <Col className=''>
              <label className='search-label'>Attribute</label>
              <OPSearchSelect options={attOptions} reloadFilter={reloadFilterAtt} />
            </Col>
            <Col className=''>
              <label className='search-label'>Card Type</label>
              <OPSearchSelect id={'card_type'} options={typeOptions} reloadFilter={reloadFilterType} />
            </Col>
            <Col className=''>
              <label className='search-label'>Card Rarity</label>
              <OPSearchSelect options={rarityOptions} reloadFilter={reloadFilterRarity} />
            </Col>
          </Row>

          {/* COLOR */}
          <Row>
            <Col>
              <div>
                <label className='search-label'>Color</label>
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
                </div>
              </div>
              {(colors.length === 2) ? (
                <div>
                  <div className='bg-Light mb-1 px-2 d-flex justify-content-center'>
                    <Button className={`search__btn border-${colors[0]} bg-${colors[0]}`}>{colors[0]}</Button>
                    <select className='rounded mx-3' onChange={e => setColorParam(e.target.value)}>
                      <option key="1" value={"||"} selected={(colorParam === "||") ? ("selected") : ('')}>OR</option>
                      <option key="2" value={"&&"} selected={(colorParam === "&&") ? ("selected") : ('')}>AND</option>
                    </select>
                    <Button className={`search__btn border-${colors[1]} bg-${colors[1]}`}>{colors[1]}</Button>
                  </div>
                </div>
              ) : ('')}
            </Col>
          </Row>
          
          <Row>
            <Col xs={6}>
              <div className='px-1 d-flex'>
                <label className='search-label'>Cost/Life</label>
                <input
                  onChange={e => reloadFilterCost(e.target.value)}
                  className="form-control search-bar" type={'number'}
                />
              </div>
            </Col>
            <Col xs={6}>
              <div className='px-1 d-flex'>
                <label className='search-label'>Power</label>
                <input
                  onChange={e => reloadFilterPower(e.target.value)}
                  className="form-control search-bar" type={'number'}
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <Form.Check type="switch"d="custom-switch"label="Has Alternate Art"
                onClick={reloadFilterAltArt}/>
              </Form>
            </Col>
            <Col>
              <Form>
                <Form.Check type="switch"d="custom-switch"label="Has Alternate Art"
                onClick={reloadFilterAltArt}/>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
      <div md={9}>
        <OPSearchView cd={cd} addCard={addCard} getCardCount={getCardCount} removeCard={removeCard}
        loading={loading} showAA={showAA} setShowAA={setShowAA} setColors={setColors} resetCardType={resetCardType}
        cards={cards
        .filter(filterAtt)
        .filter(filterType)
        .filter(filterColor)
        .filter(filterAltArt)
        .filter(filterRarity)
        .filter(filterCost)
        .filter(filterPower)
        .filter(filterMain)
      } />
      </div>
    </Container>
  );

  
}

export default OPSearch;