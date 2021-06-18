import React from 'react';
import '../../resources/css/Form.css';
import {Redirect} from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import axios from 'axios';

export class EditForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: '',
            title: '',
            description: '',
            firstParagraph: '',
            topic: '',
            reroute: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
        this.getArticle = this.getArticle.bind(this);
    }

    componentDidMount(){
        this.getArticle();
    }

    getArticle() {
        fetch(`/article/${this.props.id}`)
           .then(response => response.json())
           .then(jsonResponse => {
               this.setState(
                   { 
                     article: jsonResponse,
                     id: jsonResponse._id,
                     title: jsonResponse.title,
                     description: jsonResponse.summary,
                     firstParagraph: jsonResponse.body,
                     topic: jsonResponse.topic
                   }
                );
            });
     }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleEditorChange(e){
        this.setState({
            firstParagraph: e
        })
    }

    handleSubmit(e) {
        e.preventDefault();
         
        const data = {
            id: this.state.id,
            title: this.state.title,
            description: this.state.description,
            firstParagraph: this.state.firstParagraph,
            topic: this.state.topic
        }

        axios.put('/edit', data).then(res => {
            this.setState({
                reroute: true
            })
        })
    }

    render() {
        if(this.state.reroute){
            return (<Redirect to="/"/>)
        }
        return (
            <div className="NewForm">
                <form id="input-form" onSubmit={this.handleSubmit}>
                    <h1 id="form-title">Edit post:</h1>
                    <div id="inputs">
                        <div className="input-div">
                            <div className="input-label">
                                <label htmlFor="title">Title: </label>
                            </div>
                            <input className="input-text" id="title-input" name="title" type="text" value={this.state.title} 
                            onChange={this.handleChange} placeholder={this.state.title} maxLength="20"/>
                        </div>
                        <div className="input-div">
                            <div className="input-label">
                                <label htmlFor="description">Description: </label>
                            </div>
                            <input className="input-text" id="description" name="description" type="text" 
                            value={this.state.description} placeholder={this.state.description} 
                            onChange={this.handleChange} maxLength="30"/>
                        </div>
                        <div className="input-div" >
                            <div className="input-label">
                                <label htmlFor="topic">Topic: </label>
                            </div>
                            <select name="topic" onChange={this.handleChange} value={this.state.topic}> 
                                <option value="Javascript">Javascript</option>
                                <option value="Git">Git</option>
                                <option value="Open-Source">Open Source</option>
                                <option value="HTML-CSS">HTML & CSS</option>
                                <option value="Typescript">Typescript</option>
                                <option value="Career">Career</option>
                            </select>
                        </div>
                    </div>
                    <SunEditor name="firstParagraph" onChange={this.handleEditorChange} 
                            setContents={this.state.firstParagraph} id="editor" height="40vh"/> 
                    <input type="submit" value="Submit" className="button" />
                </form>
            </div>
        );
    }
    
}