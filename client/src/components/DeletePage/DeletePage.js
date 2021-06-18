import React from 'react';
import {Redirect} from 'react-router-dom';

export class DeletePage extends React.Component {
  constructor(props){
      super(props);
      this.state = {
        id: this.props.match.params.id
      }

      this.deleteArticle = this.deleteArticle.bind(this);
  } 

  deleteArticle() {
    fetch(`/delete/${this.state.id}`);
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