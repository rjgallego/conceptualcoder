import React from 'react';
import '../../resources/css/ArticlePreviews.css';
import { Link } from 'react-router-dom';

export class ArticlePreviews extends React.Component {
    constructor(props){
        super(props);

        this.getDate = this.getDate.bind(this);
    }

    getDate(){
        const date = new Date(this.props.article.date);
        const mm = String(date.getMonth() + 1).padStart(2, '0')
        const dd = String(date.getDate() + 1).padStart(2, '0');
        const yyyy = date.getFullYear();
        const today = mm + "-" + dd + "-" + yyyy;

        return today;
    }

    render() {
        // const DIR = "C:/Projects/ConceptualCoder/api/public/images/";
        const id = this.props.article._id;
        return(
            <div className="ArticlePreviews">
                <Link id="article-link" to={`/article/${id}`}>
                    <div id="img-div">
                        <img className="article-img" src={this.props.article.img} alt={this.props.title} />
                    </div>
                    <p id="preview-date">{this.getDate()}</p>
                    <div id="preview-text">
                        <h3 id="preview-title">{this.props.article.title}</h3>
                        <p id="preview-summary">{this.props.article.summary}</p>
                    </div>
                </Link>
            </div>
        );
    }

}