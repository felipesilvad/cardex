import React from 'react';
import {Col} from 'react-bootstrap';
import {Link,} from 'react-router-dom';
import {RiPenNibFill} from 'react-icons/ri';
import OPDeckAuthor from './OPDeckAuthor';

function OPDeckListItem({deck}) {
  const cover = `https://firebasestorage.googleapis.com/v0/b/cardex-26f5f.appspot.com/o/decks_covers%2F${deck.leader+deck.leader_art}.jpg?alt=media`

  return (
    <Col md={4}>
      <Link to={`/one-piece/decks/${deck.id}`}>
        <div className='deck_list_i__bg pt-2 set-list_img' 
          style={{backgroundImage: `url(${cover})`}}
          >
          <div className='deck_list_i__desc'>
            <div className='deck_list_i__desc_bg px-1'>
              <RiPenNibFill style={{width: '0.8rem', marginTop: '0.2rem', marginRight: '0.1rem'}} />
              <OPDeckAuthor id={deck.createdBy} />
            </div>
            <div className='deck_list_i__desc_bg px-1'>
              {deck.createdAt.toDate().toLocaleDateString()}
            </div>
          </div>
          <div className='deck_list_i__gradient'>
            <b className='deck_list_i__h'>{deck.title}</b>
          </div>
        </div>
      </Link>
    </Col>
  )
}

export default OPDeckListItem;