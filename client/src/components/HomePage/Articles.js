import React from 'react';
import equal from 'fast-deep-equal';
import '../../resources/css/Articles.css';
import {ArticlePreviews} from './ArticlePreviews';
import { Link } from 'react-router-dom';
import {checkLogin} from '../Helpers';

export class Articles extends React.Component {
    constructor(props) {
        super(props)
  
        this.state = {
           articles: [],
           loggedIn: false,
           link: process.env.NODE_ENV === 'production' ? 'https://conceptualcoder.herokuapp.com' : 'http://localhost:4001'
        }

        this.getArticles = this.getArticles.bind(this);
        this.displayButton = this.displayButton.bind(this);
        this.updateLogin = this.updateLogin.bind(this);
     }

     componentDidMount() {
        this.getArticles();
        checkLogin(this.updateLogin)
     }

     componentDidUpdate(prevProps){
         if(!equal(this.props.filter, prevProps.filter)){
             this.getArticles();
         }
     }

     updateLogin(newState) {
         this.setState({
            loggedIn: newState
         })
     }

     getArticles() {
        fetch(`${this.state.link}/${this.props.filter}`, {
            method: 'get',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin': this.state.link
            }
         })
        .then(response => response.json())
        .then(jsonResponse => this.setState({ articles: jsonResponse}));

     }

    //  checkLogin(){
    //     fetch(`${this.state.link}/users/checkLogin`, {
    //         method: 'get',
    //            credentials: "include",
    //            headers: {
    //                'Content-Type': 'application/json',
    //                'Accept': 'application/json',
    //                'Access-Control-Allow-Origin': this.state.link
    //            }
    //      })
    //      .then(response => response.json())
    //      .then(jsonResponse => this.setState({ loggedIn: jsonResponse.loggedIn}));
    //  }

     displayButton() {
         if(this.state.loggedIn) {
             return <Link to="/form" className="button" id="new-button">New Article</Link>
         }
     }
  

    render() {
        return (  
            <div className="ArticleDiv">
                {this.displayButton()}
                <div className="Articles">
                    {
                        this.state.articles.map(article => {
                            return <ArticlePreviews article={article} key={article._id} />
                        })
                    }
                </div>
            </div>
        );
    }
}