import React, { Component } from "react";
import axios from "axios";
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom'
import './ReservationlistStyle.css';


class Reservationslist extends Component {
    constructor(props) {
        super(props);
        this.state = { reservations: [] }

    }
   

    componentDidMount() {
        axios.get(`http://localhost:8080/reservation/user/${this.props.userID}`).then((res) => {
            this.setState({ reservations: res.data })
            console.log(this.state);
        })
    }

    

    onClick = () => {
        this.props.history.push("/http://localhost:3000/ReserveACubicle")
    }

    handle_delete = (id) => {
        axios.delete(`http://localhost:8080/cancel/${id}`);

    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.reservations !== prevState.reservations) {
            axios.get(`http://localhost:8080/reservation/user/${this.props.userID}`).then((res) => {
                this.setState({ reservations: res.data })
                console.log(this.state);
            })
        }
    }

   
    render() {
        return (
            <div>
                <div className="table">
                    <form>
                    <table>
                    
                        <thead>
                            <tr className = "firstchild">
                                <th>Reservation ID</th>
                                <th> User ID</th>
                                <th>Cubicle Number</th>
                                <th> Start Date</th>
                                <th>End date</th>
                                <th>Cancel</th>
                            </tr>

                        </thead>
                        <tbody>
                            {
                                this.state.reservations.map(reservation => {
                                    return (
                                        <tr key={reservation.id} reservation = {reservation}>
                                            <td>{reservation.id}</td>
                                            <td>{reservation.reservationOwnerId}</td>
                                            <td>{reservation.cubicleName+1}</td>
                                            <td>{reservation.reservationStart}</td>
                                            <td>{reservation.reservationEnd}</td>
                                            <td>
                                            
                                                <button type="button" className="ResBtn" onClick={()=> {this.handle_delete(reservation.id)}} />
                                            </td>
                                        </tr>)


                                })
                            }
                        </tbody>
                    
                </table>
            </form>
            </div>
                <Link to="/ReserveACubicle">
                <button class="ResBtn" to="/ReserveACubicle">Add New Reservation</button></Link>
                
            </div>

        )
    }
}

export default withRouter(Reservationslist)