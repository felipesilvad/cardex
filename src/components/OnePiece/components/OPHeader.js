import React from 'react';
import {Link} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../styles/OnePiece.scss';

function OPHeader() {
  return (
    <Navbar className='nav-main' expand="lg">
      <Container>
        <Navbar.Brand><Link to="/one-piece">CardDex</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link><Link className='nav-link' to="/one-piece">Home</Link></Nav.Link>
            <Nav.Link><Link className='nav-link' to="/one-piece/set">Sets</Link></Nav.Link>
            {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    // <nav className='nav-main'>
    //   <Link className='nav-link' to="/one-piece">HOME</Link>
    //   <Link  >SETS</Link>
    // </nav>
  );
}

export default OPHeader;