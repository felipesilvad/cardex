import React, { useState, useEffect } from 'react';
import { query, collection, onSnapshot, where, doc } from 'firebase/firestore';
import db from '../../../../firebase';
import {Link, useParams} from 'react-router-dom';
import {Container, Button} from 'react-bootstrap';
import {} from 'react-bootstrap';
import OPSetCardGallery from './OPSetCardGallery';
import OPSetCardTable from './OPSetCardTable';


function OPSet() {
  const id = useParams().id
  const [cards, setCards] = useState([])
  const [set, setSet] = useState([])
  const [view, setView] = useState('Gallery')

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
      <div className='bg-Gray rounded d-flex flex-wrap'>
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
        <div className='card__value-div'>
          <div>
            <span className='card__field'>Unique Cards</span>
          </div>
          <div className={'card__power card_value'}>{cards.length}</div>
        </div>
      </div>
      
      <div className='d-flex justify-content-around'>
        {(view === "Gallery" ? (
          <Button className='imgBtn set__view-btn view-btn-active' onClick={() => setView('Gallery')}>Gallery</Button>):(
          <Button className='imgBtn set__view-btn' onClick={() => setView('Gallery')}>Gallery</Button>
        ))}
        {(view === "Table" ? (
          <Button className='imgBtn set__view-btn view-btn-active' onClick={() => setView('Table')}>Table</Button>):(
          <Button className='imgBtn set__view-btn' onClick={() => setView('Table')}>Table</Button>
        ))}

      </div>
      {(view === "Gallery" ? (
        <div className='d-flex flex-wrap'>
          <OPSetCardGallery cards={cards} />
        </div>
      ) : (
        <OPSetCardTable cards={cards} />
      ))}

    </Container>
);
}

export default OPSet;