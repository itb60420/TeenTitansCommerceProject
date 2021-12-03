import React, {Component} from "react";
import Reservationslist from "../reservation/Reservationslist";
import {Link, BrowserRouter as  Router, Route, Switch} from 'react-router-dom';

export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {
            email : "",
            password: "",
        }
    }

    handleEmailChange = (e) => {
        this.setState({email: e});
    }

    handlePasswordChange = (e) => {
        this.setState({password: e});
    }
    
    handleSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.email)
        console.log(this.state.password)
        const resp = await fetch(`http://localhost:8080/sign-in?email=${this.state.email}&password=${this.state.password}`);
        if(resp.ok) {
            var data = await resp.json();
            console.log(data);
            if(data)
                this.props.handle_login(data);
        }
        else console.log(resp.status);
    }
    render() {
        return (
        <body>
        <div className="bck-image">
            <form className="box">
            <h1>Commerce Bank</h1> <b></b> <h1> Reserve A Cubicle</h1>
                <label htmlFor="email"><b></b></label>
                <input className="inemail"type="text" placeholder="Enter email" name="email" onChange={(e) => this.handleEmailChange(e.target.value)} required />

                <label htmlFor="psw"><b></b></label>
                <input className="inpsw" type="password" placeholder="Enter Password" name="password" onChange = {(e) => this.handlePasswordChange(e.target.value)} required />

                <button className="SignBtn" onClick={(e) => this.handleSubmit(e)}>Sign In</button>
                    
            </form>
            </div>
        </body>

        );

    }
    
}