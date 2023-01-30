import React, {useState, useEffect} from 'react';
import {Link,} from 'react-router-dom';
import {Container,Nav,Navbar} from 'react-bootstrap';
import db from '../../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { UserAuth } from '../../../contexts/AuthContext'
import '../styles/OnePiece.scss';
import OPHeaderProfile from './account/OPHeaderProfile'
import OPSearchBar from './Search/OPSearchBar';
import {useLocation} from 'react-router-dom';

function OPHeader() {
  const {user,logout} = UserAuth()
  const [userData, setUserData] = useState([])
  useEffect(() => {
    if (user) {
      onSnapshot(doc(db, `/users/${user.uid}`), (doc) => {
        setUserData(doc.data())
      });
    }
  }, [user]);
  

  return (
    <Navbar className='nav-main' expand="lg">
      <Container>
        <Navbar.Brand><Link to="/one-piece">CardDex</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Nav.Link className='header__nl' ><Link className='nav-link' to="/one-piece">Home</Link></Nav.Link>
            <Nav.Link className='header__nl' ><Link className='nav-link' to="/one-piece/set">Sets</Link></Nav.Link>
            <Nav.Link className='header__nl' ><Link className='nav-link' to="/one-piece/search">Search</Link></Nav.Link>
            <Nav.Link className='header__nl' ><Link className='nav-link' to="/one-piece/decks">Decks</Link></Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <OPSearchBar />
        <div className='d-flex justify-content-end header__profile'>
          <OPHeaderProfile user={user} userData={userData} logout={logout} />
        </div>
      </Container>
    </Navbar>
  );
}

export default OPHeader;