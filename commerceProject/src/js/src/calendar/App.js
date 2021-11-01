import Calendar from './calendar';
import React from 'react';
import {Link, BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const userID = 1;

function App() {
    return ( 
    <>
    <link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossOrigin="anonymous"
/>
    <Route exact path="/ReserveACubicle" component={() => <Calendar userID={userID} />} />
    </>
    );
}

export default App;