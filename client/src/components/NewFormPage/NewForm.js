import React from 'react';
import '../../resources/css/Form.css';
import {Redirect} from 'react-router-dom';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css';

import axios from 'axios';

export class NewForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            firstParagraph: '',
            fileName: '',
            topic: 'Java',
            image: '',
            reroute: false
        }
        this.handleUpload = this.handleUpload.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    handleUpload(e) {
        if(e.target.files.length > 0) {
            this.setState({
                fileName: e.target.files[0].name,
                image: e.target.files[0]
            })
        }
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
         
        let data = new FormData();

        data.append("title", this.state.title);
        data.append("description", this.state.description);
        data.append("firstParagraph", this.state.firstParagraph);
        data.append("topic", this.state.topic);
        data.append("img", this.state.image);

        axios.post('/new', data).then(() => {
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
                    <h1 id="form-title">New post:</h1>
                    <div id="inputs">
                        <div className="input-div">
                            <div className="input-label">
                                <label htmlFor="title">Title: </label>
                            </div>
                            <input className="input-text" id="title-input" name="title" type="text" value={this.state.title} 
                            onChange={this.handleChange} placeholder="(max 20)" maxLength="20"/>
                        </div>
                        <div className="input-div">
                            <div className="input-label">
                                <label htmlFor="description">Description: </label>
                            </div>
                            <input className="input-text" id="description" name="description" type="text" 
                            value={this.state.description} placeholder="(max 30)" 
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
                        <div id="upload">
                            <label htmlFor="image-upload" className="image-upload-label">
                                Upload Image
                            </label>
                            <label id="filename" name="fileName">{this.state.fileName}</label>
                            <input id="image-upload" name="img" type="file" onChange={this.handleUpload} />
                        </div>
                    </div>
                    <SunEditor name="firstParagraph" onChange={this.handleEditorChange} 
                            placeholder="Body" id="editor" height="40vh"/> 
                    <input type="submit" value="Submit" className="button" />
                </form>
            </div>
        );
    }
    
}