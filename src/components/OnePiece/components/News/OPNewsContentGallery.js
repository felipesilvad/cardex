import React, { useState, useEffect } from 'react'
import {Button,Row,Col,Image} from 'react-bootstrap';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../../../../firebase';
import OPCardModal from '../Card/OPCardModal';

const OPNewsContentGallery = ({galleryCard, cards}) => {
  const galleryCard_n = galleryCard.split(',')[0].replace('(card_n=','')
  const galleryCard_art = galleryCard.split(',')[1].replace('alt_art=','')

  const card = cards.filter((x) => x.card_n === galleryCard_n)[0]

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

  return (
    <div key={galleryCard_n} className='news_img__gallery set__g_bg'>
      {card&&(
        <>
          {(galleryCard_art === '0') ? (
            <div onClick={() => openCardModal(card, card.img, card.source)}>
              <Image className='set__card-img' src={card.img} />
            </div>
          ) : ('')}
          {(galleryCard_art === '1') ? (
            <div onClick={() => openCardModal(card, card.img_P1, card.source_P1)}>
              <Image className='set__card-img' src={card.img_P1} />
            </div>
          ) : ('')}
           {(galleryCard_art === '2') ? (
            <div onClick={() => openCardModal(card, card.img_P2, card.source_P2)}>
              <Image className='set__card-img' src={card.img_P2} />
            </div>
          ) : ('')}
           {(galleryCard_art === '3') ? (
            <div onClick={() => openCardModal(card, card.img_P3, card.source_P3)}>
              <Image className='set__card-img' src={card.img_P3} />
            </div>
          ) : ('')}
           {(galleryCard_art === '4') ? (
            <div onClick={() => openCardModal(card, card.img_P4, card.source_P4)}>
              <Image className='set__card-img' src={card.img_P4} />
            </div>
          ) : ('')}
          <b className='mt-2'>{galleryCard_n+" - "+card.title}</b>
        </>
      )}
      <OPCardModal show={show} handleClose={handleClose} card={cardModal} img={cardImg} img_src={cardImgSrc} />
    </div>
  )
}

export default OPNewsContentGallery