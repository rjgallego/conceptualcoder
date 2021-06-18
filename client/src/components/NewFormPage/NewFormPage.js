import React from 'react';
import {NewForm} from './NewForm';
import {SearchBar} from '../SearchBar';
import {Footer} from '../Footer';
import {Redirect} from 'react-router-dom';

export class NewFormPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: false
        }

        this.checkLogin = this.checkLogin.bind(this);
    }

    componentDidMount(){
        this.checkLogin();
    }

    checkLogin() {
        fetch('/users/checkLogin', {
            method: 'get',
            credentials: "include"
        })
        .then(response => response.json())
        .then(jsonResponse => {
           if(!jsonResponse.loggedIn){
               this.setState({
                   redirect: true
               })
           }
        })
     }

    render() {
        if(this.state.redirect){
            return (<Redirect to={{
                pathname: "/login"
              }} />)
        }
        return (
            <div className="FormPage">
                <SearchBar />
                <NewForm />
                <Footer />
            </div>
        );
    }
}

