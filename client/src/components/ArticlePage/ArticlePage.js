import React from 'react';
import moment from 'moment';
import '../../resources/css/ArticlePage';
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
               <p className="date">{moment(new Date(this.state.article.date)).format('MM/DD/YYYY')}</p>
               <h1 className="title">{this.state.article.title}</h1>
               <h2 className="summary">{this.state.article.summary}</h2>
               <p className="body">{ReactHtmlParser(this.state.article.body)}</p>
             </div>
             <Footer />
          </div>
      );
   }
}