import React, {Component} from "react";
import Reservationslist from "../reservation/Reservationslist";
import {Link, BrowserRouter as  Router, Route, Switch} from 'react-router-dom';

export default class Login extends Component{
    
    render() {
        return (<form>

            <h3>Log in To Reserve Your Cubicle</h3>

            <div className="form-group">
                <label>Email</label>
                <input type="email" className="form-control" placeholder="Enter email" />
            </div>

            <div className="form-group">
                <label>Password</label>
                <input type="password" className="form-control" placeholder="Enter password" />
            </div>
            <Link to="/Reservationlist">
            <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button></Link>
        </form>
        );
    }
}