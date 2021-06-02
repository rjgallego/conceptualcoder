import React from 'react';
import {EditForm} from './EditForm';
import {SearchBar} from '../SearchBar';
import {Footer} from '../Footer';
import {Redirect} from 'react-router-dom';

export class EditPage extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            redirect: false,
            link: process.env.NODE_ENV === 'production' ? 'https://conceptualcoder.herokuapp.com' : 'http://localhost:4001',
            src: process.env.NODE_ENV === 'production' ? 'https://conceptualcoder.herokuapp.com' : 'http://localhost:3000'
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
                 'Access-Control-Allow-Origin': this.state.src
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
            <div className="EditPage">
                <SearchBar />
                <EditForm id={this.props.match.params.id}/>
                <Footer />
            </div>
        );
    }
}

