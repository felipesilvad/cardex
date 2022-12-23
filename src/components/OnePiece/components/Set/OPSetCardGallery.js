import React, {useState}  from 'react';
import {Link} from 'react-router-dom';
import { Image} from 'react-bootstrap';

const OPSetCardGallery = ({cards, altArt}) => {

  if (cards) {
    return (
      cards.map((card) => (
        <Link key={card.card_n} className='set__img' to={`/one-piece/card/${card.card_n}`}>
          <div className='set__g_bg'>
            <Image className='set__card-img' key={card.card_n} 
              src={(altArt) ? (card.img_P1) : (card.img)} 
            />
            <b className='mt-2'>{card.card_n+" - "+card.title}</b>
          </div>
        </Link>
      ))
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