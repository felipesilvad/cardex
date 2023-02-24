import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot,orderBy,limit } from 'firebase/firestore';
import db from '../../../../firebase';
import {Link} from 'react-router-dom';
import { Row, Col, Image, Carousel} from 'react-bootstrap';
import OPNewsTags from './OPNewsTags';

function OPHomeNews() {
  const [news, setNews] = useState([])
  useEffect (() => {
    onSnapshot(query(collection(db, `/op/news/news`),orderBy('createdAt') , limit(6)), (snapshot) => {
      setNews(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
  })

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Row style={{backgroundColor: `black`}} className='p-1'>
      <Col md={9} className="d-none d-md-block home-news-vh">
        <Carousel activeIndex={index} onSelect={handleSelect} >
          {(news !== []) ? (
            news.map((newItem, i) => (
              <Carousel.Item key={i}>
                <Link to={`/one-piece/news/${newItem.id}`}>
                  <img
                    className="d-block w-100 home-news-vh" src={newItem.thumb} alt={`${i} News`}
                  />
                  <OPNewsTags tags={newItem.tags} />
                  <div className='deck_list_i__gradient home-news__item-bg text-white'>
                    <h3>{newItem.title}</h3>
                    {/* <div className='' dangerouslySetInnerHTML={{ __html: newItem.content[0].slice(0,500)}}></div> */}
                  </div>
                </Link>
              </Carousel.Item>
            ))
          ) : ('')}
        </Carousel>
      </Col>
      <Col md={3} className='scrollbar scrollbar-primary search-overflow home-news-vh'>
        <div>
          {(news !== []) ? (
            news.map((newItem, i) => (
              <>
                <div className={`deck_list_i__bg home-news__side-block
                  d-none d-md-block 
                  ${(index === i) ? ('home-news__side-block-active') : ('')}`}
                  onClick={() => handleSelect(i)}
                >
                  <Image className='news_img' src={newItem.thumb} />
                  <OPNewsTags tags={newItem.tags} />
                  <div className='deck_list_i__gradient'>
                    <b className='deck_list_i__h'>{newItem.title}</b>
                  </div>
                </div>
                <Link to={`/one-piece/news/${newItem.id}`}>
                  <div className={`deck_list_i__bg home-news__side-block
                    d-md-none 
                    ${(index === i) ? ('home-news__side-block-active') : ('')}`}
                    onClick={() => handleSelect(i)}
                  >
                    <Image className='news_img' src={newItem.thumb} />
                    <div className='news_tags_list d-flex'>
                      {newItem.tags&&(
                        newItem.tags.map((tagItem) => (
                          <>
                            {(tagItem.value === "English") ? (<div className='px-2 mx-1 bg-primary rounded text-white'>{tagItem.value}</div>) : ('')}
                            {(tagItem.value === "Japanese") ? (<div className='px-2 mx-1 bg-light rounded text-dark'>{tagItem.value}</div>) : ('')}
                            {(tagItem.value === "Card Reveal") ? (<div className='px-2 mx-1 bg-danger rounded text-white'>{tagItem.value}</div>) : ('')}
                            {(tagItem.value === "Leaks") ? (<div className='px-2 mx-1 bg-warning rounded text-white'>{tagItem.value}</div>) : ('')}
                            {(tagItem.value === "Product") ? (<div className='px-2 mx-1 bg-secondary rounded text-white'>{tagItem.value}</div>) : ('')}
                            {(tagItem.value === "Event") ? (<div className='px-2 mx-1 bg-info rounded text-white'>{tagItem.value}</div>) : ('')}
                          </>
                        ))
                      )}
                    </div>
                    <div className='deck_list_i__gradient'>
                      <b className='deck_list_i__h'>{newItem.title}</b>
                    </div>
                  </div>
                </Link>
              </>
            ))
          ) : ('')}
        </div>
      </Col>
    </Row>
);
}

export default OPHomeNews;