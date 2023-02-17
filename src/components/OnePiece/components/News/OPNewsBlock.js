import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot } from 'firebase/firestore';
import db from '../../../../firebase';
import {Link} from 'react-router-dom';
import { Row, Col, Image, Container} from 'react-bootstrap';

function OPNewsBlock({newItem}) {

  return (
    <div>
      <Link to={`/one-piece/news/${newItem.id}`}>
      <div className='deck_list_i__bg pt-2 set-list_img' >
        <Image className='news_img' src={newItem.thumb} />
        <div className='deck_list_i__gradient'>
          <b className='deck_list_i__h'>{newItem.title}</b>
        </div>
        </div>
      </Link>
    </div>
  );
}

export default OPNewsBlock;