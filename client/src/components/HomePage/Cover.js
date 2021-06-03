import React from 'react';
import '../../resources/css/Cover.css';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithub, faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import {checkLogin} from '../Helpers';


export class Cover extends React.Component {
    constructor(props){
        super(props);
  
        this.state = {
           previous: "blog",
           loggedIn: false,
           filter: '',
           lastFilter: '',
           route: '/login',
           loginText: 'Login',
           link: process.env.NODE_ENV === 'production' ? 'https://conceptualcoder.herokuapp.com' : 'http://localhost:4001',
           src: process.env.NODE_ENV === 'production' ? 'https://conceptualcoder.herokuapp.com' : 'http://localhost:3000'
         }
  
        this.logoutUser = this.logoutUser.bind(this);
        this.updateLogin = this.updateLogin.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.updateLoginState = this.updateLoginState.bind(this);
     }
  
     componentDidMount(){
        checkLogin(this.updateLoginState)
     }

     updateLoginState(login){
         this.setState({
            loggedIn: login,
            route: login ? '/' : '/login',
            loginText: login ? 'Logout' : 'Login'
         })
     }

     updateLogin() {
        if(this.state.loggedIn){
           this.logoutUser();
        } else {
         this.updateLoginState(!this.state.loggedIn);
        }
     }
  
     logoutUser(){
        fetch(`${this.state.link}/users/logout`, {
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
           this.updateLoginState(jsonResponse.loggedIn);
        })
     }

   updateFilter(e){
      this.setState({
         lastFilter: this.state.filter,
         filter: e.target.innerText
      }, () => {
         if(this.state.lastFilter.length > 0){
            document.getElementById(this.state.lastFilter).style.backgroundColor = 'rgba(42, 51, 43, 0)';
            document.getElementById(this.state.lastFilter).style.color = '#FFFFFF';
         }
         if(this.state.lastFilter === this.state.filter){
            document.getElementById(this.state.lastFilter).style.backgroundColor = 'rgba(42, 51, 43, 0)';
            document.getElementById(this.state.lastFilter).style.color = '#FFFFFF';
         } else {
            document.getElementById(this.state.filter).style.backgroundColor = '#FFFFFF';
            document.getElementById(this.state.filter).style.color = 'rgba(42, 51, 43, 0.7)';
         }

         this.props.setFilter(this.state.filter);
      })
   }

    render() {
        return (
            <div className="Cover">
                <div id="home-menu" className="menu">
                  <ul className="menu-options">
                     <li id="login"><Link to={this.state.route} id="login-link" className="link" onClick={this.updateLogin}>{this.state.loginText}</Link></li>
                     <li id="blog"><Link id="blog-link" className="current link" 
                        to="/">Home</Link></li>
                     <li id="about"><Link to="/about-me" className="link">About</Link></li>
                  </ul>
               </div>
               <div id="title-div" className="page-title">
                  <h1 id="home-title">The Conceptual Coder</h1>
                  <div id="social">
                    <a href="https://github.com/rjgallego"><FontAwesomeIcon className="social-icon" icon={faGithub} size="lg" /></a>
                    <a href="https://www.linkedin.com/in/rheanna-pena-aa0007110/"><FontAwesomeIcon className="social-icon" icon={faLinkedin} size="lg" /></a>
                    <a href="/"><FontAwesomeIcon className="social-icon" icon={faEnvelope} size="lg" /></a>
                  </div>
               </div>
               <div className="TopicsBar">
                  <h2>Topics</h2>
                  <div id="Javascript" className="topic" onClick={this.updateFilter}><h3>Javascript</h3></div>
                  <div id="Git" className="topic" onClick={this.updateFilter}><h3>Git</h3></div>
                  <div id="Open-Source" className="topic" onClick={this.updateFilter}><h3>Open-Source</h3></div>
                  <div id="HTML-CSS" className="topic" onClick={this.updateFilter}><h3>HTML-CSS</h3></div>
                  <div id="React" className="topic" onClick={this.updateFilter}><h3>React</h3></div>
                  <div id="Career" className="topic" onClick={this.updateFilter}><h3>Career</h3></div>
               </div>
            </div>
        );
    }
}