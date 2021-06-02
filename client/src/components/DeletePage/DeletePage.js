import React from 'react';
import {Redirect} from 'react-router-dom';

export class DeletePage extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        id: this.props.match.params.id,
        link: process.env.NODE_ENV === 'production' ? 'https://conceptualcoder.herokuapp.com' : 'http://localhost:4001'
      }

      this.deleteArticle = this.deleteArticle.bind(this);
  } 

  deleteArticle() {
    fetch(`${this.state.link}/delete/${this.state.id}`);
  }

  componentDidMount() {
    this.deleteArticle();
  }

  render(){
      return (<Redirect to={{
        pathname: "/"
      }} />)
  }
}