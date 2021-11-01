import React, { useState} from 'react';
//import { Col, Container, Row } from 'react-bootstrap';
//import "./App.css";
import data from "./mock-data.json";
//import Details from './Details';



const Reservationslist = () => {
    
    const [reservations, setReservations] = useState(data);
   // const[reservationId, setReservationId] = useState(null);

    //useEffect, fetch

 
    return (
 
        <div className = "app-container">
            <form>
    <table>
        <thead>
            <tr>
                <th>Reservation ID</th>
                <th>Name</th>
                <th>Cubicle Number</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Arrival Time</th>
                <th>Depature Time</th>
            </tr>
        </thead>
        <tbody>
        {reservations.map((rev)=> (
        <tr>
        <td>{rev.revId}</td>
        <td>{rev.name}</td>
        <td>{rev.cubicle}</td>
        <td>{rev.sdate}</td>
        <td>{rev.edate}</td>
        <td> {rev.atime}</td>
        <td> {rev.dtime}</td>
        </tr>
        ))}
           
             
        </tbody>
    </table>
    </form>
    </div>
     
   
    )
}

export default Reservationslist

 /* {reservations.map((rev)=> 
            <Details key = {rev.id} reservation = {rev}
                
              handleCancelClick = {handleCancelClick}>
             </Details>
            
              )}*/ 

  /* const handleCancelClick = (reservationId) => {
        const newReservations = [...reservations];

        const index = reservations.findIndex((rev)=>rev.id === reservationId);

        newReservations.splice(index, 1);

        setReservations(newReservations);


    }*/
