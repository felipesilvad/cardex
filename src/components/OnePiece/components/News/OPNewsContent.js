import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import OPNewsContentCard from './OPNewsContentCard'
import OPNewsContentGallery from './OPNewsContentGallery';

const OPNewsContent = ({content, cards}) => {
  if (content.includes('card_with_info:')) {
    const card_n = content.replace('card_with_info:','').split(',')[0].replace("card_n=",'').replace('/ADDCARD/','')
    const card = cards.filter((cardItem) => cardItem.card_n === card_n)[0]
    const art = content.replace('card_with_info:','').split(',')[1].replace("alt_art=",'').replace('/ADDCARD/','')
    console.log(art)

    if (art === "0") {
      return (<OPNewsContentCard card={card} img={card.img} img_src={card.source} />)
    }
    if (art === "1") {
      return (<OPNewsContentCard card={card} img={card.img_P1} img_src={card.source_P1} />)
    }
    if (art === "2") {
      return (<OPNewsContentCard card={card} img={card.img_P2} img_src={card.source_P2} />)
    }
    if (art === "3") {
      return (<OPNewsContentCard card={card} img={card.img_P3} img_src={card.source_P3} />)
    }
    if (art === "4") {
      return (<OPNewsContentCard card={card} img={card.img_P4} img_src={card.source_P4} />)
    }
  } else if (content.includes('gallery:')) {
    const galleryCardList = content.replace('gallery:','').split(')')
    console.log(galleryCardList)
    return (
      <div className='d-flex flex-wrap justify-content-around'>
        {galleryCardList.map((galleryCard) => (
          (galleryCard !== '') ? (<OPNewsContentGallery galleryCard={galleryCard} cards={cards} />) : ('')
        ))}
      </div>
    )
  } else {

      return (
        <div className='' dangerouslySetInnerHTML={{ __html: content}}></div>
      )
    
  }
}

export default OPNewsContent