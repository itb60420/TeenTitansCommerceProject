import React from 'react';
import {Link, BrowserRouter as  Router, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Reservationslist from './Reservationslist';
import Calendar from '../calendar/calendar';
import { Container } from 'react-bootstrap';
import Logout from './Logout';
import Login from '../login/login.component'


function App() {
  return (
    
    <div>
    <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossOrigin="anonymous"
    />
    <Container>
    <Router>
    <Header />
    <Link to="/">Login</Link>
    <Route path = "/" exact={true} component={Login} />
    <Link to="/Reservationlist">Reservation List</Link>
    <Route path = "/Reservationlist" exact={true} component={Reservationslist} />
    <Link to="/ReserveACubicle">Reserve a cubicle</Link>
    <Route path = "/ReserveACubicle" exact={true} component={Calendar} />
    <Link to="/Logout">Logout</Link>
    <Route path = "/Logout"  exact={true} component={Logout} />
    </Router>
    </Container>
    </div>
  )
}

export default App;
    


      


