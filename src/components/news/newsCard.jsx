import React from 'react'
import '../../styles/newsCard.css'


const NewsCard = ({title, link, source}) => {

    return (
        <a href={link} target="_blank">
            
            <div className="news-card-container">
                <h1>{title}</h1>
                <p>Source: {source}</p>
            </div>

        </a>
    )
}

export default NewsCard