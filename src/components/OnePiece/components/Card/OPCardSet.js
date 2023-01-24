import React, { useState, useEffect } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import {Link} from 'react-router-dom';
import db from '../../../../firebase';

const OPCardSet = ({set_id}) => {
  const [set, setSet] = useState([])

  useEffect(() => {
    onSnapshot(doc(db, "/op/sets/sets/", set_id), (doc) => {
      setSet(doc.data());
    });
  }, [set_id]);

  return (
    <Link to={`/one-piece/set/${set_id}`}>
      <div className='card__value-div'>
        <div>
          <span className='card__set_box d-flex text-white'>SET: 
            <h3 className='m-1 card__set-title'>{set_id} - {set.title}</h3>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default OPCardSet