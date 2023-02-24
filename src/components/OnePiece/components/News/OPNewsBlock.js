import React from 'react';
import {Link} from 'react-router-dom';
import {Image} from 'react-bootstrap';
import OPNewsTags from './OPNewsTags';

function OPNewsBlock({newItem}) {
  return (
    <div>
      <Link to={`/one-piece/news/${newItem.id}`}>
      <div className='deck_list_i__bg pt-2 set-list_img' >
        <Image className='news_img' src={newItem.thumb} />
        <OPNewsTags tags={newItem.tags} />
        <div className='deck_list_i__gradient'>
          <b className='deck_list_i__h'>{newItem.title}</b>
        </div>
        </div>
      </Link>
    </div>
  );
}

export default OPNewsBlock;