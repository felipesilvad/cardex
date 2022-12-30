import React, {useState}  from 'react';
import {Link} from 'react-router-dom';
import {Image, Nav} from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import OPLogin from './OPLogin'

const OPHeaderProfile = ({user, userData, logout}) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const [openDd, setOpenDd] = useState(false);

  const handleOpenDd = () => {
    setOpenDd(!openDd);
  };

  const handleLogout = async () => {
    try{
      await logout()
      navigate('/one-piece');
      window.location.reload(false);
    }catch(e) {
      console.log(e.message)
    }
  }

  if (userData) {
    return (
      <div onClick={handleOpenDd} className='d-flex justify-content-end'>
        <div className='header__profile_name mx-2'>
            {userData.username}
        </div>
        <Image className='header__pp' src={userData.profile_pic_url} />
        {openDd ? (
          <div className="header__profile-dd">
            <Link to="/one-piece/account">
              <div className='header__profile-dd-item'>Account</div>
            </Link>
            <Link to="/one-piece/create-deck">
              <div className='header__profile-dd-item'>Create Deck</div>
            </Link>
            <Link onClick={handleLogout}>
              <div className='header__profile-dd-item'>Logout</div>
            </Link>
          </div>
        ) : null}
      </div>
    )
  } else {
    return (
      <>
        <Nav.Link className='header__nl header__n-user' onClick={handleShow}><Link className='nav-link'>Login</Link></Nav.Link>
        <Nav.Link className='header__nl header__n-user'><Link to='/one-piece/signup' className='nav-link'>Sign Up</Link></Nav.Link>
        <OPLogin show={show} handleClose={handleClose} handleShow={handleShow} />
      </>
    )
  }
}

export default OPHeaderProfile