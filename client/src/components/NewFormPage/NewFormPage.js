import React from 'react';
import {NewForm} from './NewForm';
import {SearchBar} from '../SearchBar';
import {Footer} from '../Footer';
import {Redirect} from 'react-router-dom';

export class NewFormPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: false,
            link: process.env.NODE_ENV === 'production' ? 'https://conceptualcoder.herokuapp.com' : 'http://localhost:4001'
        }

        this.checkLogin = this.checkLogin.bind(this);
    }

    componentDidMount(){
        this.checkLogin();
    }

    checkLogin() {
        fetch(`${this.state.link}/users/checkLogin`, {
           method: 'get',
              credentials: "include",
              headers: {
                 'Content-Type': 'application/json',
                 'Accept': 'application/json',
                 'Access-Control-Allow-Origin': this.state.link
           }
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

