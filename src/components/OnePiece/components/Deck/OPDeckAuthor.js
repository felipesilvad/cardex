import React, { useState, useEffect } from 'react';
import {onSnapshot, doc} from 'firebase/firestore';
import db from '../../../../firebase';

function OPDeckAuthor({id}) {
  const [user, setUser] = useState()
  
  useEffect(() => {
    onSnapshot(doc(db, "/users/", id), (doc) => {
      setUser(doc.data());
    });
  }, [id]);
  if (user) {
    return (<>{user.username}</>);
  }
}

export default OPDeckAuthor;