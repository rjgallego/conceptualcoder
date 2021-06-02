import React from 'react';
import {LoginForm} from './LoginForm';
import '../../resources/css/LoginPage.css';

import {SearchBar} from "../SearchBar";

export class LoginPage extends React.Component {
    
    render() {
        return (
            <div className="LoginPage">
                <SearchBar />
                <div id="form">
                    <LoginForm />
                </div>
            </div>
        );
    }
}