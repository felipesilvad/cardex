import React, { useState, useEffect } from 'react'
import {Button,Row,Col,Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {TbLayoutSidebarRightCollapse} from 'react-icons/tb';
import OPCardImgSource from '../Card/OPCardImgSource';
import OPCardEffect from '../Card/OPCardEffect';

import Strike from '../../assets/ico_type01.png';
import Ranged from '../../assets/ico_type04.png';
import Special from '../../assets/ico_type03.png';
import Wisdom from '../../assets/ico_type05.png';
import Slash from '../../assets/ico_type02.png';

const OPNewsContentCard = ({card,img,img_src}) => {
  const [color_class, setColorClass] = useState('')
  
  useEffect(() => {
    if (card.color_2) {
      setColorClass(card.color_1+'-'+card.color_2)
    } else {setColorClass(card.color)}
  }, [card]);

  return (
    <div className='card_modal__bg'>
      <Row>
        <Col sm={4}>
          <Image className='set__card-img'src={img}/>
          <OPCardImgSource img_src={img_src} set={card.set} />
        </Col>
        <Col sm={8} className=''>
          <div className='m-1'>
            <div className={'br-top d-flex bg-'+color_class}>
              <div className='w-100'>
                <h4 className='card__title'>{card.title}</h4>
                <h6 className='card__sub-title'>{card.card_n} {card.title_jp}</h6>
              </div>
            </div>
            <div className="text-center d-flex flex-wrap justify-content-around">
              <div className='card__value-div'>
                <div>
                  <span className='card__field'>
                    {(card.rarity === "L") ? ('Life:') : ('Cost:')}
                  </span>
                </div>
                <div className={'card__cost card_value bg-'+color_class+'-tl'}>{card.cost}</div>
              </div>
              {!! card.power &&(
                (card.power !== " ") ? (
                  <div className='card__value-div'>
                    <div>
                      <span className='card__field'>Power:</span>
                    </div>
                    <div className={'card__power card_value bg-'+color_class}>{card.power}</div>
                  </div>
                ) : ('')
              )}
              {!! card.counter &&(
                <div className='card__value-div'>
                  <div>
                    <span className='card__field'>Counter:</span>
                  </div>
                  <div className={'card__power card_value bg-'+color_class}>+{card.counter}</div>
                </div>
              )}

              <div className='card__value-div'>
                <div>
                  <span className='card__field'>Color:</span>
                </div>
                <div className={'card__color card_value bg-'+color_class}>
                  {(card.color_2) ? (card.color_1+'/'+card.color_2) : (card.color)}
                </div>
              </div>

              <div className='card__value-div'>
                <div>
                  <span className='card__field'>Rarity:</span>
                </div>
                <div className='card__rarity card_value'>{card.rarity}</div>
              </div>
              <div className='card__value-div'>
                <div>
                  <span className='card__field'>Card Type:</span>
                </div>
                <div className={'card__color card_value bg-'+color_class}>{card.card_type}</div>
              </div>
              {!! card.attribute &&(
                <div className='card__value-div'>
                  <div>
                    <span className='card__field'>Attribute:</span>
                  </div>
                  <div className={'card__color card_value d-flex'}>
                    {(card.attribute === "Strike") ? (<Image className='card__att-img' src={Strike} />) : ('')}
                    {(card.attribute === "Ranged") ? (<Image className='card__att-img' src={Ranged} />) : ('')}
                    {(card.attribute === "Special") ? (<Image className='card__att-img' src={Special} />) : ('')}
                    {(card.attribute === "Wisdom") ? (<Image className='card__att-img' src={Wisdom} />) : ('')}
                    {(card.attribute === "Slash") ? (<Image className='card__att-img' src={Slash} />) : ('')}
                    <div>
                      <span className={'card__att bg-'+card.attribute}>{card.attribute}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-left">
              <div className='card__value-div'>
                <div>
                  <span className='card__field'>Types:</span>
                </div>
                <div className='card_value card__types'>
                  {!! card.types &&(card.types.map((type, i) => (
                    (i === 0) ? (type) : (', '+type)
                  )))}
                </div>
              </div>
            </div>

            {/* EFFECT */}
            
            <div className="text-center card__stat_row-values">
              <div className='card__effect-field'>Effect</div>
            </div>
            <div className="card__stat_row-values">
              <div className='card__effect-value'>
                {!! card.effects &&(card.effects.map((effect, i) => (
                  <OPCardEffect effect={effect} i={i} />
                )))}
              </div>
            </div>
            {!! card.triggers &&(
              <div className="text-left px-1">
                <div className='card__value-div'>
                  <div>
                    <span className='card__field trigger'>Trigger:</span>
                  </div>
                  <div className='card_value card__types card__effect mx-1'>
                    {!! card.triggers &&(card.triggers.map((trigger, i) => (
                      <OPCardEffect effect={trigger} i={i} />
                    )))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
      
    </div>
  )
}

export default OPNewsContentCard