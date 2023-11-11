import React from 'react'

const CarouselArticle = ({carousel, renderCard = () => {}}) => {
    return (
        <li>
            <h1>{carousel.name}</h1>
            <ul style={{padding:'16px 32px', listStyle:'none', display:'flex', gap:'8px', overflow:'scroll'}}>
                {carousel?.results?.map(card => renderCard(card))}
            </ul>
        </li>
    )
}

export { CarouselArticle };