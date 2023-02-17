import React, { useState } from 'react';
import {Image, Button, Tabs, Tab} from 'react-bootstrap';
import OPCardImgSource from './OPCardImgSource';

function OPCardImg({card}) {
  const [imgJP, setImgJP] = useState(false)
  const [imgJP_P1, setImgJP_P1] = useState(false)
  const [imgJP_P2, setImgJP_P2] = useState(false)
  
  return (
    <div className='bg-Gray p-1 rounded mt-1'>
      <Tabs className="img__nav-item mb-1" defaultActiveKey="main">
        <Tab eventKey="main" title="MAIN ART">
          <Image className='card__img mb-1'src={imgJP ? card.img_jp : card.img}/>
          <OPCardImgSource img_src={card.source} set={card.set} />
          {card.img&&(
            <Button className='imgBtn' onClick={() => setImgJP(false)}>English Image</Button>
          )}
          {card.img_jp&&(
            <Button className='imgBtn' onClick={() => setImgJP(true)}>Japanse Image</Button>
          )}
          <div>
            {!! card.illust_type &&(
              (card.illust_type !== " ") ? (
                <span className='img__field mx-1'>Illustration Type: 
                  <b className='img__value mx-1'>{card.illust_type}</b>
                </span>
              ) : ('')
            )}
            {!! card.artist &&(
              (card.artist !== " ") ? (
                <span className='img__field mx-1'>Artist: 
                  <b className='img__value mx-1'>{card.artist}</b>
                </span>
              ) : ('')
            )}
          </div>
        </Tab>
        {!!card.img_P1&&(
          <Tab eventKey="p1" title="ALTERNATE ART">
            <Image className='card__img mb-1'src={imgJP_P1 ? card.img_P1_jp : card.img_P1}/>
            <OPCardImgSource img_src={card.source_P1} set={card.set} />
            {card.img_P1&&(
              <Button className='imgBtn' onClick={() => setImgJP_P1(false)}>English Image</Button>
            )}
            {card.img_P1_jp&&(
              <Button className='imgBtn' onClick={() => setImgJP_P1(true)}>Japanse Image</Button>
            )}
            <div>
              {!! card.illust_type_P1 &&(
                (card.illust_type_P1 !== " ") ? (
                  <span className='img__field mx-1'>Illustration Type: 
                    <b className='img__value mx-1'>{card.illust_type_P1}</b>
                  </span>
                ) : ('')
              )}
              {!! card.artist_P1 &&(
                (card.artist_P1 !== " ") ? (
                  <span className='img__field mx-1'>Artist: 
                    <b className='img__value mx-1'>{card.artist_P1}</b>
                  </span>
                ) : ('')
              )}
            </div>
          </Tab>
        )}
        {!!card.img_P2&&(
          <Tab eventKey="p2" title="ALTERNATE ART 2">
            <Image className='card__img mb-1'src={imgJP_P2 ? card.img_P2_jp : card.img_P2}/>
            <OPCardImgSource img_src={card.source_P2} set={card.set} />
            {card.img_P2&&(
              <Button className='imgBtn' onClick={() => setImgJP_P2(false)}>English Image</Button>
            )}
            {card.img_P2_jp&&(
              <Button className='imgBtn' onClick={() => setImgJP_P2(true)}>Japanse Image</Button>
            )}
            <div>
              {!! card.illust_type_P2 &&(
                (card.illust_type_P2 !== " ") ? (
                  <span className='img__field mx-1'>Illustration Type: 
                    <b className='img__value mx-1'>{card.illust_type_P2}</b>
                  </span>
                ) : ('')
              )}
              {!! card.artist_P2 &&(
                (card.artist_P2 !== " ") ? (
                  <span className='img__field mx-1'>Artist: 
                    <b className='img__value mx-1'>{card.artist_P1}</b>
                  </span>
                ) : ('')
              )}
            </div>
          </Tab>
        )}
      </Tabs>
    </div>
)}

export default OPCardImg;