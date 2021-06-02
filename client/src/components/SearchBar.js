import React from 'react';
import '../resources/css/SearchBar.css';

export class SearchBar extends React.Component {
   render() {
         return (
            <div className="SearchBar">
               <div id="menu">
                  <h3 id="home"><a id="home-link" href="/">Home</a></h3>
               </div>
               <div className="page-title">
                  <h1>The Conceptual Coder</h1>
               </div>
            </div>
         )
      
   }
}