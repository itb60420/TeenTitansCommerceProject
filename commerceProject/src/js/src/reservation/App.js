import React, {useState} from 'react';
import {Link, BrowserRouter as  Router, Route, Switch} from 'react-router-dom';
import Header from './Header';
import Reservationslist from './Reservationslist';
import Calendar from '../calendar/calendar';
import { Container } from 'react-bootstrap';
import Logout from './Logout';
import Login from '../login/login.component'
import '../login/App.css'


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const handle_login = async (e) => {
    console.log(e);
    await setLoggedIn(true);
    await setUser(e);
  }

  const handle_logout = () => {
    setLoggedIn(false);
    setUser(null);
  }


  return(
  //  <>
 //   {loading ? 
  //  <div ><Login />
  //  </div>:
    <div >
      <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossOrigin="anonymous"
      />

      {loggedIn && user ? 
      <Container>
      <Router>
      <div className="navbar">
      <Header userID={user ? user.id : null} handle_logout={handle_logout}/>
      </div>
      <Link to="/"></Link>
      <Route path = "/" exact={true} component={() => <Reservationslist userID={user.id} />} />
      <Link to="/ReserveACubicle"></Link>
      <Route path = "/ReserveACubicle" exact={true} component={() => <Calendar userID={user.id}  />} />
      <Link to="/Logout"></Link>
      <Route path = "/Logout"  exact={true} component={Logout} />
      </Router>
      </Container> 
      :

      <Login userID={user ? user.id : null} handle_login={handle_login} />
      }

      </div>
  )
}

export default App;


