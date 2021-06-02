import React from 'react';
import '../resources/css/Footer.css';
import { Link } from 'react-router-dom';

export class Footer extends React.Component {
   render() {
         return (
            <div className="Footer">
               <Link to="/login" className="footer-link">Login</Link>
               <Link to="/" className="footer-link">Home</Link>
               <h1 id="footer-title">The Conceptual Coder</h1>
               <Link to="/aboutme" className="footer-link">About Me</Link>
               <Link to="/" className="footer-link">Contact</Link>
            </div>
         )
      
   }
}