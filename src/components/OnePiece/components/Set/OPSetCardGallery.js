import React, {useState}  from 'react';
import {Image} from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';

const OPSetCardGallery = ({cards,showAA,cd,addCard,getCardCount,removeCard,setColors,resetCardType,openCardModal}) => {

  const [loadedCards, setLoadedCards] = useState(cards.slice(0,60))
  const [hasMore, setHasMore] = useState(true)
  const loadFunc = () => {
    setLoadedCards(cards)
    setHasMore(false)
  }
  const checkAddCard = (card, art) => {
    if (card.card_type === "Leader") {
      if (!card.color_2) {setColors([card.color_1])}
      else {setColors([card.color_1, card.color_2])}
      resetCardType()
      addCard(card, art)
    } else {
      addCard(card, art)
    }
  }

  const checkRemoveCard = (card) => {
    if (card.card_type === "Leader") {
      setColors([])
      removeCard(card.card_n)
    } else {
      removeCard(card.card_n)
    }
  }

  if (cards) {
    return (
      <div className='d-flex flex-wrap'>
        <InfiniteScroll
          dataLength={loadedCards.length} //This is important field to render the next data
          next={loadFunc}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
          refreshFunction={this.refresh}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
          pullDownToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
          }
          releaseToRefreshContent={
            <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
          }
        >
          {loadedCards}
          {/* {loadedCards.map((card) => (
            <>
              <div key={card.card_n} className='set__img set__g_bg'>
                {(cd&&(
                  <>
                    <div onClick={() => checkRemoveCard(card)} className='gallery_add_circle gac__minus'>-</div>
                    <div className='gallery_add_circle gac__count'>{getCardCount(card.card_n)}</div>
                    <div onClick={() => checkAddCard(card, '')} className='gallery_add_circle gac__plus'>+</div>
                  </>
                ))}
                <div onClick={() => openCardModal(card, card.img, card.source)}>
                  <Image className='set__card-img' src={card.img} />
                  <b className='mt-2'>{card.card_n+" - "+card.title}</b>
                </div>
              </div>
              {(showAA) ? (
                <>
                  {((card.img_P1) ? (
                    ((card.img_P1 !== "") ? (
                      <div key={`${card.card_n}_P1`} className='set__img set__g_bg'>
                        {(cd&&(
                          <>
                            <div onClick={() => checkRemoveCard(card)} className='gallery_add_circle gac__minus'>-</div>
                            <div className='gallery_add_circle gac__count'>{getCardCount(card.card_n)}</div>
                            <div onClick={() => checkAddCard(card, '_P1')} className='gallery_add_circle gac__plus'>+</div>
                          </>
                        ))}
                        <div onClick={() => openCardModal(card, card.img_P1, card.source_P1)}>
                          <Image className='set__card-img' src={card.img_P1} />
                          <b className='mt-2'>{card.card_n+" - "+card.title}</b>
                        </div>
                      </div>
                    ) : (''))
                  ) : (''))}
                  {((card.img_P2) ? (
                    ((card.img_P2 !== "") ? (
                      <div key={`${card.card_n}_P2`} className='set__img set__g_bg'>
                        {(cd&&(
                          <>
                            <div onClick={() => checkRemoveCard(card)} className='gallery_add_circle gac__minus'>-</div>
                            <div className='gallery_add_circle gac__count'>{getCardCount(card.card_n)}</div>
                            <div onClick={() => checkAddCard(card, '_P2')} className='gallery_add_circle gac__plus'>+</div>
                          </>
                        ))}
                        <div onClick={() => openCardModal(card, card.img_P2, card.source_P2)}>
                          <Image className='set__card-img' src={card.img_P2} />
                          <b className='mt-2'>{card.card_n+" - "+card.title}</b>
                        </div>
                      </div>
                    ) : (''))
                  ) : (''))}
                </>
              ) : ('')}
              
            </>
          ))} */}
        </InfiniteScroll>
      </div>
    )
  } else {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    )
  }
}

export default OPSetCardGallery