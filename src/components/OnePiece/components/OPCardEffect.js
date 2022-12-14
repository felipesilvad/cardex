import React  from 'react';
import {} from 'react-bootstrap';

function OPCardEffect({effect, i}) {
  return (
    <>{
      (effect === 'Activate: Main' || effect  === 'When Attacking' || effect  === 'On Play' || effect  === 'Main') ? (
        <b className='card__effect effect_blue' key={i}>{effect}</b>
      ) : (
      (effect === 'Once Per Turn') ? (
        <b className='card__effect effect_pink' key={i}>{effect}</b>
      ) : (effect === 'DON!! x1' || effect === 'DON!! x2') ? (
        <b className='card__effect effect_black' key={i}>{effect}</b>
      ) : (effect === 'Blocker' || effect === 'Rush') ? (
        <b className='card__effect effect_orange' key={i}>{effect}</b>
      ) : (effect === 'Counter') ? (
        <b className='card__effect effect_red' key={i}>{effect}</b>
      ) : (
        <b className='card__effect mx-1' key={i}>{effect}</b>
      ))
    }</>
);
}

export default OPCardEffect;