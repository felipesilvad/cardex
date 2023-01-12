import React  from 'react';
import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';

const OPSetCardGallery = ({cards, showAA, cd,addCard}) => {
  if (cards) {
    return (
      <div className='d-flex flex-wrap'>
        {cards.map((card) => (
          <>
            <Link key={card.card_n} className='set__img' 
              onClick={(cd &&(() => addCard(card, '')))}
              to={(!cd &&(`/one-piece/card/${card.card_n}`))}
            >
              <div key={card.card_n} className='set__g_bg'>
                <Image className='set__card-img' src={card.img} />
                <b className='mt-2'>{card.card_n+" - "+card.title}</b>
              </div>
            </Link>
            {(showAA) ? (
              <>
                {((card.img_P1) ? (
                  ((card.img_P1 !== "") ? (
                    <Link key={`${card.card_n}_P1`} className='set__img'
                      onClick={(cd &&(() => addCard(card, '_P1')))}
                      to={(!cd &&(`/one-piece/card/${card.card_n}`))}
                    >
                      <div key={card.card_n} className='set__g_bg'>
                        <Image className='set__card-img' src={card.img_P1} />
                        <b className='mt-2'>{card.card_n+" - "+card.title}</b>
                      </div>
                    </Link>
                  ) : (''))
                ) : (''))}
                {((card.img_P2) ? (
                  ((card.img_P2 !== "") ? (
                    <Link key={`${card.card_n}_P2`} className='set__img' 
                      onClick={(cd &&(() => addCard(card, '_P2')))}
                      to={(!cd &&(`/one-piece/card/${card.card_n}`))}
                    >
                      <div key={card.card_n} className='set__g_bg'>
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