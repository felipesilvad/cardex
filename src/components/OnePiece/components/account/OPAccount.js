import React, {useState, useEffect} from 'react'
import { UserAuth } from '../../../../contexts/AuthContext'
import db from '../../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import {Button,Image,Row,Col,Container} from 'react-bootstrap'
import { useNavigate } from "react-router-dom"
import OPChangePic from './OPChangePic';
import OPUnlockPic from './OPUnlockPic';

const OPAccount = () => {
  const {user,logout} = UserAuth()
  const navigate = useNavigate();
  const [userData, setUserData] = useState([])

  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, `/users/${user.uid}`), (doc) => {
        setUserData(doc.data())
      });
    }
  }, [user]);

  const handleLogout = async () => {
    try{
      await logout()
      navigate('/one-piece');
    }catch(e) {
      console.log(e.message)
    }
  }

  return (
    <Container>
      <Row>
        <Col xs={2}>
          <Image className='webkit-fill rounded' src={userData && userData.profile_pic_url} />
          <OPChangePic userData={userData} />
          <OPUnlockPic userData={userData} />
          <Button onClick={handleLogout} className="w-100 btn-danger" type="submit">
            Logout
          </Button>
        </Col>
        <Col xs={10}>
          <div className='bg-Gray rounded mx-1 p-1 px-2'>
            <h3 className=''>{userData && userData.username}</h3>
          </div>
        </Col>
      </Row>
      
    </Container>
  )
}

export default OPAccount