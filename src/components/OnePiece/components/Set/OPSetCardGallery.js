import React  from 'react';
import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';

const OPSetCardGallery = ({cards,showAA,cd,addCard,getCardCount,removeCard,setColors,resetCardType,openCardModal}) => {

  const checkAddCard = (card, art) => {
    if (card.card_type === "Leader") {
      if (!card.color_2) {setColors([card.color_1])}
      else {setColors([card.color_1, card.color_2])}
      resetCardType()
      addCard(card, art)
    } else {
      addCard(card, art)
    }
  }

  const checkRemoveCard = (card) => {
    if (card.card_type === "Leader") {
      setColors([])
      removeCard(card.card_n)
    } else {
      removeCard(card.card_n)
    }
  }

  if (cards) {
    return (
      <div className='d-flex flex-wrap'>
        {cards.map((card) => (
          <>
            <Link key={card.card_n} className='set__img' 
              onClick={() => openCardModal(card, card.img)}
              // to={(!cd &&(`/one-piece/card/${card.card_n}`))}
            >
              <div key={card.card_n} className='set__g_bg'>
                {(cd&&(
                  <>
                    <div onClick={() => checkAddCard(card, '')} className='gallery_add_circle gac__plus'>+</div>
                    <div className='gallery_add_circle gac__count'>{getCardCount(card.card_n)}</div>
                    <div onClick={() => checkRemoveCard(card)} className='gallery_add_circle gac__minus'>-</div>
                  </>
                ))}
                <Image className='set__card-img' src={card.img} />
                <b className='mt-2'>{card.card_n+" - "+card.title}</b>
              </div>
            </Link>
            {(showAA) ? (
              <>
                {((card.img_P1) ? (
                  ((card.img_P1 !== "") ? (
                    <Link key={`${card.card_n}_P1`} className='set__img'
                    onClick={() => openCardModal(card, card.img_P1)}
                      // to={(!cd &&(`/one-piece/card/${card.card_n}`))}
                    >
                      <div key={card.card_n} className='set__g_bg'>
                        {(cd&&(
                          <>
                            <div onClick={() => checkAddCard(card, '_P1')} className='gallery_add_circle gac__plus'>+</div>
                            <div className='gallery_add_circle gac__count'>{getCardCount(card.card_n)}</div>
                            <div onClick={() => checkRemoveCard(card)} className='gallery_add_circle gac__minus'>-</div>
                          </>
                        ))}
                        <Image className='set__card-img' src={card.img_P1} />
                        <b className='mt-2'>{card.card_n+" - "+card.title}</b>
                      </div>
                    </Link>
                  ) : (''))
                ) : (''))}
                {((card.img_P2) ? (
                  ((card.img_P2 !== "") ? (
                    <Link key={`${card.card_n}_P2`} className='set__img' 
                    onClick={() => openCardModal(card, card.img_P2)}
                      // to={(!cd &&(`/one-piece/card/${card.card_n}`))}
                    >
                      <div key={card.card_n} className='set__g_bg'>
                        {(cd&&(
                          <>
                            <div onClick={() => checkAddCard(card, '_P2')} className='gallery_add_circle gac__plus'>+</div>
                            <div className='gallery_add_circle gac__count'>{getCardCount(card.card_n)}</div>
                            <div onClick={() => checkRemoveCard(card)} className='gallery_add_circle gac__minus'>-</div>
                          </>
                        ))}
                        <Image className='set__card-img' src={card.img_P2} />
                        <b className='mt-2'>{card.card_n+" - "+card.title}</b>
                      </div>
                    </Link>
                  ) : (''))
                ) : (''))}
              </>
            ) : ('')}
            
          </>
        ))}
      </div>
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