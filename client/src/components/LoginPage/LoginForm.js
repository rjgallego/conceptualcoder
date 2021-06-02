import React from 'react';
import '../../resources/css/LoginForm.css';
import user from '../../resources/images/user.png';
import {Redirect} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';


export class LoginForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {},
            redirect: false,
            returnedUser: {},
            link: process.env.NODE_ENV === 'production' ? 'https://conceptualcoder.herokuapp.com' : 'http://localhost:4001',
            src: process.env.NODE_ENV === 'production' ? 'https://conceptualcoder.herokuapp.com' : 'http://localhost:3000'
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const user = this.state.user;
        user[e.target.name] = e.target.value;
        this.setState({
            user: user
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        const user = {
            user: this.state.user
        }

        fetch(`${this.state.link}/users/login`, {
            method: 'post',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': this.state.src
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if(response.status === 401){
                return {
                    errors: {
                        "username or password" : "is invalid"
                    }
                };
            } else{
                return response.json();
            }
        })
        .then(jsonResponse => {
            if(jsonResponse.errors){
                const error = "* " + Object.keys(jsonResponse.errors)[0] + " " + Object.values(jsonResponse.errors)[0];
                document.getElementById("error-message").innerText = error;
            }
            else {
                document.getElementById("error-message").innerText = '';
                this.setState({
                    redirect: true,
                    returnedUser: jsonResponse.user
                })
            }
        });
    }

    render() {
        if(this.state.redirect){
            return (<Redirect to={{
                pathname: "/",
                state: { loggedIn: true, user: this.state.returnedUser }
              }} />)
        }
        else {
            return (
                <div className="Form">
                    <img src={user} className="user-logo" alt="user" />
                    <form id="login-form" onSubmit={this.handleSubmit}>
                        <div className="input-field">
                            <div className="icon"><FontAwesomeIcon icon={faEnvelope} /></div>
                            <input id="email" className="user-input" name="email" type="text" value={this.state.email} 
                                onChange={this.handleChange} placeholder="Email"/>
                        </div>
                        <div className="input-field">
                            <div  className="icon"><FontAwesomeIcon icon={faLock} /></div>
                            <input id="password" className="user-input" name="password" type="password" value={this.state.password} 
                                onChange={this.handleChange} placeholder="Password"/>
                        </div>
                        <div id="error-message"></div>
                        <input type="submit" value="Login" id="submit-button" />
                    </form>
                </div>
            );
        }
    }
    
}