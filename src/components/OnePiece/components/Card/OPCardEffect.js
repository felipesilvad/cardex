import React  from 'react';
import {} from 'react-bootstrap';
import Strike from '../../assets/ico_type01.png';
import Ranged from '../../assets/ico_type04.png';
import Special from '../../assets/ico_type03.png';
import Wisdom from '../../assets/ico_type05.png';
import Slash from '../../assets/ico_type02.png';

function OPCardEffect({effect, i}) {
  
  return (
    <>{
      // BLUE
      (effect === 'Activate: Main' ||
      effect  === 'When Attacking' ||
      effect  === 'On Play' ||
      effect  === 'Main' ||
      effect  === 'On Block' ||
      effect  === "Opponent's Turn" ||
      effect  === "Your Turn" ||
      effect  === "On K.O."

      ) ? (
        <b className='card__effect effect_blue' key={i}>{effect}</b>
      ) : (
      (effect === 'Once Per Turn') ? (
        <b className='card__effect effect_pink' key={i}>{effect}</b>
      ) : (effect === 'DON!! x1' || effect === 'DON!! x2') ? (
        <b className='card__effect effect_black' key={i}>{effect}</b>
      ) : (
        // ORANGE
        effect === 'Blocker' ||
        effect === 'Rush' ||
        effect === 'Banish' ||
        effect === 'Double Attack'
        ) ? (i === 0 ? (
          <b className='card__effect effect_orange ml-2' key={i}>{effect}</b>
        ) : (
          <b className='card__effect effect_orange' key={i}>{effect}</b>
        )
      ) : (effect === 'Counter') ? (
        <b className='card__effect effect_red' key={i}>{effect}</b>
      ) : (<b className='card__effect mx-1' key={i}
          dangerouslySetInnerHTML={{ __html: effect
            .replace("<Strike>",`<img class='card__att-img_effect' src=${Strike} /><span class='font-oswald'>Strike</span>`)
            .replace("<Ranged>",`<img class='card__att-img_effect' src=${Ranged} /><span class='font-oswald'>Ranged</span>`)
            .replace("<Special>",`<img class='card__att-img_effect' src=${Special} /><span class='font-oswald'>Special</span>`)
            .replace("<Wisdom>",`<img class='card__att-img_effect' src=${Wisdom} /><span class='font-oswald'>Wisdom</span>`)
            .replace("<Slash>",`<img class='card__att-img_effect' src=${Slash} /><span class='font-oswald'>Slash</span>`)

            .replace("(After your opponent declares an attack, you may rest this card to make it the new target of the attack.)",`<i>(After your opponent declares an attack, you may rest this card to make it the new target of the attack.)</i>`)
            .replace("(You may rest the specified number of DON!! cards in your cost area.)",`<i>(You may rest the specified number of DON!! cards in your cost area.)</i>`)
            .replace("(When this card deals damage, the target card is trashed without activating its Trigger.)",`<i>(When this card deals damage, the target card is trashed without activating its Trigger.)</i>`)
            .replace("(This card deals 2 damage.)",`<i>(This card deals 2 damage.)</i>`)
            .replace("(You may return the specified number of DON!! cards from your field to your DON!! deck.)",`<i>(You may return the specified number of DON!! cards from your field to your DON!! deck.)</i>`)
            .replace("(This card can attack on the turn in which it is played.)",`<i>(This card can attack on the turn in which it is played.)</i>`)
            
            .replace("You may return 1 Character to your hand:",`<b>You may return 1 Character to your hand:</b>`)
            .replace("You may rest this Character:",`<b>You may rest this Character:</b>`)
            .replace("You may trash 1 card from your hand:",`<b>You may trash 1 card from your hand:</b>`)

            .replace("DON!! −1",`<b>DON!! −1</b>`)
            .replace("DON!! −2",`<b>DON!! −1</b>`)
            .replace("DON!! −3",`<b>DON!! −1</b>`)
            .replace("DON!! −4",`<b>DON!! −1</b>`)
            .replace("DON!! −5",`<b>DON!! −1</b>`)
            .replace("DON!! −6",`<b>DON!! −1</b>`)
            .replace("DON!! −7",`<b>DON!! −1</b>`)
            
            
            .replace("➀",`<b class="effect_don-bg">1</b>`)
            .replace("①",`<b class="effect_don-bg">1</b>`)
            .replace("➃",`<b class="effect_don-bg">4</b>`)

            
          }}
        />
      ))
    }</>
);
}

export default OPCardEffect;