import React from 'react';
import '../../resources/css/ArticlePage.css';
import {SearchBar} from '../SearchBar';
import {Footer} from '../Footer';
import {Link} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { checkLogin } from '../Helpers';

export class ArticlePage extends React.Component {

   constructor(props){
      super(props);
      this.state = {
         id: this.props.match.params.id,
         article: {},
         link: process.env.NODE_ENV === 'production' ? 'https://conceptualcoder.herokuapp.com' : 'http://localhost:4001'
      }

      this.getArticle = this.getArticle.bind(this);
      this.getDate = this.getDate.bind(this);
      this.displayButton = this.displayButton.bind(this);
      this.updateState = this.updateState.bind(this);
   }   

   
   componentDidMount() {
      this.getArticle();
      checkLogin(this.updateState);
   }

   getArticle() {
      fetch(`${this.state.link}/article/${this.state.id}`)
         .then(response => response.json())
         .then(jsonResponse => this.setState({ article: jsonResponse}));
   }

   getDate(){
      const date = new Date(this.state.article.date);
      const mm = String(date.getMonth()).padStart(2, '0');
      const dd = String(date.getDate() + 1).padStart(2, '0');
      const yyyy = date.getFullYear();
      const today = mm + "-" + dd + "-" + yyyy;

      return today;
  }

//   checkLogin(){
//    fetch(this.state.link + "/users/checkLogin", {
//        method: 'get',
//           credentials: "include",
//           headers: {
//               'Content-Type': 'application/json',
//               'Accept': 'application/json',
//               'Access-Control-Allow-Origin': this.state.link
//           }
//     })
//     .then(response => response.json())
//     .then(jsonResponse => this.setState({ loggedIn: jsonResponse.loggedIn}));
//    }

   displayButton() {
      if(this.state.loggedIn) {
         return (
            <div id="button-div">
               <Link to={`/edit/${this.state.id}`} id="edit-button" className="button article-button">Edit Article</Link>
               <Link to={`/delete/${this.state.id}`} id="delete-button" className="button article-button">Delete Article</Link>
            </div>
         )
      }
   }

   updateState(login){
      this.setState({
         loggedIn: login
      })
   }

   render() {
      return (
          <div className="ArticlePage">
             <SearchBar />
             {this.displayButton()}
             <div  className="Article">
               <p className="date">{this.getDate()}</p>
               <h1 className="title">{this.state.article.title}</h1>
               <h2 className="summary">{this.state.article.summary}</h2>
               <p className="body">{ReactHtmlParser(this.state.article.body)}</p>
             </div>
             <Footer />
          </div>
      );
   }
}