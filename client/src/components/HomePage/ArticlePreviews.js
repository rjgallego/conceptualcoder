import React from 'react';
import moment from 'moment';
import '../../resources/css/ArticlePreviews.css';
import { Link } from 'react-router-dom';

export class ArticlePreviews extends React.Component {
    render() {
        const id = this.props.article._id;
        return(
            <div className="ArticlePreviews">
                <Link id="article-link" to={`/article/${id}`}>
                    <div id="img-div">
                        <img className="article-img" src={this.props.article.img} alt={this.props.title} />
                    </div>
                    <p id="preview-date">{moment(new Date(this.props.article.date)).format('MM/DD/YYYY')}</p>
                    <div id="preview-text">
                        <h3 id="preview-title">{this.props.article.title}</h3>
                        <p id="preview-summary">{this.props.article.summary}</p>
                    </div>
                </Link>
            </div>
        );
    }

}