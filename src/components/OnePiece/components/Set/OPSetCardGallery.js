import React  from 'react';
import {Link} from 'react-router-dom';
import { Image} from 'react-bootstrap';

const OPSetCardGallery = ({cards}) => {

  if (cards) {
    return (
      cards.map((card) => (
        <Link className='set__img' to={`/one-piece/card/${card.card_n}`}>
          <Image className='card__img' key={card.card_n} src={card.img} />
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