import React, {useState}  from 'react';
import {Image} from 'react-bootstrap';
import OPCardModal from '../Card/OPCardModal';

const OPSetCardGallery = ({cards,getCardArt,getCardCount}) => {

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

  if (cards) {
    return (
      <>
        <div className='d-flex flex-wrap'>
          {cards.map((card) => (
            <div key={card.card_n} className='set__img set__g_bg'>
              <div className='d-flex justify-content-center'>
                <div className='gallery_add_circle gac__minus text-white'>{getCardCount(card.card_n)}</div>
              </div>
              {!getCardArt(card.card_n)&&(
                <div onClick={() => openCardModal(card, card.img, card.source)}>
                  <Image className='set__card-img' src={card.img} />
                  <b className='mt-2'>{card.card_n+" - "+card.title}</b>
                </div>
              )}
              {(getCardArt(card.card_n) === "_P1") ? (
                <div onClick={() => openCardModal(card, card.img_P1, card.sourceP1)}>
                  <Image className='set__card-img' src={card.img_P1} />
                  <b className='mt-2'>{card.card_n+" - "+card.title}</b>
                </div>
              ) : ('')}
              {(getCardArt(card.card_n) === "_P2") ? (
                <div onClick={() => openCardModal(card, card.img_P2, card.sourceP2)}>
                  <Image className='set__card-img' src={card.img_P2} />
                  <b className='mt-2'>{card.card_n+" - "+card.title}</b>
                </div>
              ) : ('')}
              {(getCardArt(card.card_n) === "_P3") ? (
                <div onClick={() => openCardModal(card, card.img_P3, card.sourceP3)}>
                  <Image className='set__card-img' src={card.img_P3} />
                  <b className='mt-2'>{card.card_n+" - "+card.title}</b>
                </div>
              ) : ('')}
              {(getCardArt(card.card_n) === "_P4") ? (
                <div onClick={() => openCardModal(card, card.img_P4, card.sourceP4)}>
                  <Image className='set__card-img' src={card.img_P4} />
                  <b className='mt-2'>{card.card_n+" - "+card.title}</b>
                </div>
              ) : ('')}
            </div>
          ))}
        </div>
        <OPCardModal show={show} handleClose={handleClose} card={cardModal} img={cardImg} img_src={cardImgSrc} />
      </>
    )
  } else {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
}

export default OPSetCardGallery