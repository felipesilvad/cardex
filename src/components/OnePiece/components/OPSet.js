import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, where, doc } from 'firebase/firestore';
import db from '../../../firebase';
import {Link, useParams} from 'react-router-dom';
import { Image, Container} from 'react-bootstrap';
import {} from 'react-bootstrap';


function OPSet() {
  const id = useParams().id
  const [cards, setCards] = useState([])
  const [set, setSet] = useState([])

  useEffect (() => {
    onSnapshot(query(collection(db, `/op/cards/cards`), where("set", "==", id)), (snapshot) => {
      setCards(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
    });
    onSnapshot(doc(db, "/op/sets/sets/", id), (doc) => {
      setSet(doc.data());
      console.log(doc.data())
    });
  }, [id])

  return (
    <Container>
      <div className='set__bg' style={{backgroundImage: `url(${set.img_cut})`}}>
        <div className='set__bg-overlay'>
          <div>
            <b className='set__title'>{id +" - "+ set.title}</b>
          </div>
        </div>
      </div>
        <div className='bg-Gray rounded'>
        {!! set.release_date_en &&(
          <div className='card__value-div'>
            <div>
              <span className='card__field'>Release Date English:</span>
            </div>
            <div className={'card__power card_value'}>{set.release_date_en.toDate().toLocaleDateString()}</div>
          </div>
        )}
        {!! set.release_date_jp &&(
          <div className='card__value-div'>
            <div>
              <span className='card__field'>Release Date Japanese:</span>
            </div>
            <div className={'card__power card_value'}>{set.release_date_jp.toDate().toLocaleDateString()}</div>
          </div>
        )}
      </div>
      <div className='d-flex flex-wrap'>
        {(cards !== []) ? (
          cards.map((card) => (
            <Link className='set__img' to={`/one-piece/card/${card.card_n}`}>
              <Image className='card__img' key={card.card_n} src={card.img} />
            </Link>
          ))
        ) : (
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        )}
      </div>
    </Container>
);
}

export default OPSet;