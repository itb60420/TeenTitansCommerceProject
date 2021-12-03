
import React from 'react';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, Router } from 'react-router-dom';
import Calendar from '../calendar/calendar'

const Header = (props) => {
    return (
      <>
    <Navbar bg="dark" variant="dark" className="navbar">
    <Container>
    <Nav className="me-auto">
    <div className="navbar-group">
      <Link to="/">
      <button className="hbtn" to="/" onClick={() => {props.handle_logout()}}>Logout</button></Link>

      </div>
    </Nav>
    </Container>
  </Navbar>
      </>
    )
}

export default Header;
/*<>
    
         <Button variant="success">Reserve a Cubicle</Button>{'  '}
         <Button variant="success">Log out</Button>{'  '}
      </>

    </Nav> */

 /*   <>
    <Router>
    <Navbar bg ="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home"> My Reservations</Navbar.Brand>
    <Nav className="me-auto">
    <LinkContainer to="/ReserveACubicle">
      <Nav.Link href="#ReserveACubicle" component={Calendar}>Reserve A Cubicle</Nav.Link>
    </LinkContainer>
    <LinkContainer to="/Logout">
      <Nav.Link href="#logout">Log Out</Nav.Link>
    </LinkContainer>
    </Nav>
    </Container>
  </Navbar>
  </Router>
  <br />
  </> */