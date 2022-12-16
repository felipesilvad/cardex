import React, { useState } from 'react';
import {Image, Button, Tabs, Tab} from 'react-bootstrap';

function OPCardImg({card}) {
  const [imgJP, setImgJP] = useState(false)
  const [imgJP_P1, setImgJP_P1] = useState(false)
  const [imgJP_P2, setImgJP_P2] = useState(false)
  
  return (
    <div className='bg-Gray p-1 rounded mt-1'>
      <Tabs className="img__nav-item mb-1" defaultActiveKey="main">
        <Tab eventKey="main" title="MAIN ART">
          <Image className='card__img mb-1'src={imgJP ? card.img_jp : card.img}/>
          <div className='img__src-bg'>
            {(card.source === "Main") ? (
              `Main Card Art from ${card.set}`
            ) : ('')}
            {(card.source === "Set") ? (
              `Alternate Card Art from ${card.set}`
            ) : ('')}
          </div>
          <Button className='imgBtn' onClick={() => setImgJP(false)}>English Image</Button>
          <Button className='imgBtn' onClick={() => setImgJP(true)}>Japanse Image</Button>
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
        </Tab>
        {!!card.img_P1&&(
          <Tab eventKey="p1" title="ALTERNATE ART">
            <Image className='card__img mb-1'src={imgJP_P1 ? card.img_P1_jp : card.img_P1}/>
            <div className='img__src-bg'>
              {(card.source_P1 === "Main") ? (
                `Main Card Art from ${card.set}`
              ) : ('')}
              {(card.source_P1 === "Set") ? (
                `Alternate Card Art from ${card.set}`
              ) : ('')}
              {(card.source_P1 === "Manga Rare") ? (
                `Manga Rare Art from ${card.set}`
              ) : ('')}
            </div>
            <Button className='imgBtn' onClick={() => setImgJP_P1(false)}>English Image</Button>
            <Button className='imgBtn' onClick={() => setImgJP_P1(true)}>Japanse Image</Button>
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
          </Tab>
        )}
        {!!card.img_P2&&(
          <Tab eventKey="p2" title="ALTERNATE ART 2">
            <Image className='card__img mb-1'src={imgJP_P2 ? card.img_P2_jp : card.img_P2}/>
            <div className='img__src-bg'>
              {(card.source_P2 === "Main") ? (
                `Main Card Art from ${card.set}`
              ) : ('')}
              {(card.source_P2 === "Set") ? (
                `Alternate Card Art from ${card.set}`
              ) : ('')}
              {(card.source_P2 === "Manga Rare") ? (
                `Manga Rare Art from ${card.set}`
              ) : ('')}
            </div>
            <Button className='imgBtn' onClick={() => setImgJP_P2(false)}>English Image</Button>
            <Button className='imgBtn' onClick={() => setImgJP_P2(true)}>Japanse Image</Button>
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
          </Tab>
        )}
      </Tabs>
    </div>
)}

export default OPCardImg;