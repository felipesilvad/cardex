import React, {useState}  from 'react';
import {Image} from 'react-bootstrap';
import OPCardModal from '../Card/OPCardModal';

const OPSetCardLeader = ({leader,getCardArt,getCardCount}) => {

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

  if (leader) {
    return (
      <>
        <div key={leader.card_n} className='deck__img-leader set__g_bg'>
          <div className='gallery_add_circle gac__minus text-white'>{getCardCount(leader.card_n)}</div>
          {!getCardArt(leader.card_n)&&(
            <div onClick={() => openCardModal(leader, leader.img, leader.source)}>
              <Image className='set__card-img' src={leader.img} />
              <b className='mt-2'>{leader.card_n+" - "+leader.title}</b>
            </div>
          )}
          {(getCardArt(leader.card_n) === "_P1") ? (
            <div onClick={() => openCardModal(leader, leader.img_P1, leader.sourceP1)}>
              <Image className='set__card-img' src={leader.img_P1} />
              <b className='mt-2'>{leader.card_n+" - "+leader.title}</b>
            </div>
          ) : ('')}
          {(getCardArt(leader.card_n) === "_P2") ? (
            <div onClick={() => openCardModal(leader, leader.img_P2, leader.sourceP2)}>
              <Image className='set__card-img' src={leader.img_P2} />
              <b className='mt-2'>{leader.card_n+" - "+leader.title}</b>
            </div>
          ) : ('')}
          {(getCardArt(leader.card_n) === "_P3") ? (
            <div onClick={() => openCardModal(leader, leader.img_P3, leader.sourceP3)}>
              <Image className='set__card-img' src={leader.img_P3} />
              <b className='mt-2'>{leader.card_n+" - "+leader.title}</b>
            </div>
          ) : ('')}
          {(getCardArt(leader.card_n) === "_P4") ? (
            <div onClick={() => openCardModal(leader, leader.img_P4, leader.sourceP4)}>
              <Image className='set__card-img' src={leader.img_P4} />
              <b className='mt-2'>{leader.card_n+" - "+leader.title}</b>
            </div>
          ) : ('')}
        </div>
        <OPCardModal show={show} handleClose={handleClose} card={cardModal} img={cardImg} img_src={cardImgSrc} />
      </>
    );
  }
}

export default OPSetCardLeader