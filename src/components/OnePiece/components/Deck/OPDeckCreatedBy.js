import React, { useState, useEffect } from 'react';
import {onSnapshot, doc} from 'firebase/firestore';
import db from '../../../../firebase';
import {Image} from 'react-bootstrap';

function OPDeckCreatedBy({id,createdAt}) {
  const [user, setUser] = useState()
  
  useEffect(() => {
    onSnapshot(doc(db, "/users/", id), (doc) => {
      setUser(doc.data());
    });
  }, [id]);

  if (user) {
    return (
      <div className='d-flex'>
        <Image src={user.profile_pic_url} className='header__pp' />
        <div className='mx-2 color-lighter'>
          Created by: {user.username}
          <br />
          <p className='font-weight-light'>{createdAt.toDate().toLocaleDateString()}</p>
        </div>
      </div>
    );
  }
}

export default OPDeckCreatedBy;