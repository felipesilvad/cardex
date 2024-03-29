import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, where, doc } from 'firebase/firestore';
import db from '../../../../firebase';
import {useParams} from 'react-router-dom';
import {Container, Button} from 'react-bootstrap';
import {Form,} from 'react-bootstrap';
import OPSetCardGallery from './OPSetCardGallery';
import OPSetCardTable from './OPSetCardTable';
import OPCardModal from '../Card/OPCardModal';


function OPSet() {
  const id = useParams().id
  const [cards, setCards] = useState([])
  const [set, setSet] = useState([])
  const [view, setView] = useState('Gallery')
  const [showAA, setShowAA] = useState(false)

  const [cardModal, setCardModal] = useState('')
  const [cardImg, setCardImg] = useState('')
  const [cardImgSrc, setCardImgSrc] = useState('')
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openCardModal = (card,img,img_src) => {
    setCardModal(card)
    setCardImg(img)
    setCardImgSrc(img_src)
    handleShow()
  }

  useEffect (() => {
    onSnapshot(query(collection(db, `/op/cards/cards`), where("set", "==", id)), (snapshot) => {
      setCards(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    onSnapshot(doc(db, "/op/sets/sets/", id), (doc) => {
      setSet(doc.data());
    });
  }, [id])

  return (
    <Container>
      <div className='set__bg' style={{backgroundImage: `url(${set.img_cut})`}}>
        <div className='set__bg-overlay'>
          <div>
            <b className='set__title'>{id +" - "+ set.title}</b>
          </div>
        </div>
      </div>
      <div className='bg-Gray rounded d-flex flex-wrap'>
        {!! set.release_date_en &&(
          <div className='card__value-div'>
            <div>
              <span className='card__field'>Release Date English:</span>
            </div>
            <div className={'card__power card_value'}>{set.release_date_en.toDate().toLocaleDateString()}</div>
          </div>
        )}
        {!! set.release_date_jp &&(
          <div className='card__value-div'>
            <div>
              <span className='card__field'>Release Date Japanese:</span>
            </div>
            <div className={'card__power card_value'}>{set.release_date_jp.toDate().toLocaleDateString()}</div>
          </div>
        )}
        <div className='card__value-div'>
          <div>
            <span className='card__field'>Unique Cards</span>
          </div>
          <div className={'card__power card_value'}>{cards.length}</div>
        </div>
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
      {(view === "Gallery" ? (
        <div>
          <div className='d-flex justify-content-end w-100'>
            <Form className='d-flex justify-content-end w-100'>
              <Form.Check type="switch"d="custom-switch"label="Show Alternate Art"
              className='d-flex justify-content-end aa-switch w-100' onClick={() => setShowAA(!showAA)} />
            </Form>
          </div>
          <OPSetCardGallery cards={cards} showAA={showAA} openCardModal={openCardModal} />
        </div>
      ) : (
        <OPSetCardTable cards={cards} openCardModal={openCardModal} />
      ))}
      <OPCardModal show={show} handleClose={handleClose} card={cardModal} img={cardImg} img_src={cardImgSrc} />
    </Container>
);
}

export default OPSet;