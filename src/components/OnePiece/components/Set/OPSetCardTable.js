import React  from 'react';
import {Link} from 'react-router-dom';
import {} from 'react-bootstrap';

const OPSetCardTable = ({cards}) => {

  if (cards) {
    return (
      <table className='bg-Gray rounded set__table'>
        <thead>
          <tr>
            <th className='th_n'>Number</th>
            <th className=''></th>
            <th><b className='ml-2'>Title</b></th>
            <th className='md-only-table th_n th-border '>Cost/Life</th>
            <th className='md-only-table th_n th-border'>Color</th>
            <th className='md-only-table th_n th-border'>Power</th>
            <th className='md-only-table th_n th-border'>Attribute</th>
            <th className='th_type th-border'>Type</th>
          </tr>
        </thead>
        <tbody>
          {(cards !== []) ? (
            cards.map((card) => (
              <tr key={card.card_n}>
                {(card.color_2 ? (
                  <td className={`th_n bg-${card.color_1}-${card.color_2}`} >
                    {card.card_n}
                    </td>) : (
                  <td className={`th_n bg-${card.color}`}>{card.card_n}</td>
                ))}
                <td className='th_rarity'>{card.rarity}</td>

                <td className='th_title w-100'><Link className='w-100 th_title' to={`/one-piece/card/${card.card_n}`}>{card.title}</Link></td>
                
                <td className='md-only-table th_n th-border'><b>{card.cost}</b></td>
                {(card.color_2 ? (
                  <td className={`md-only-table th_n bg-${card.color_1}-${card.color_2}`} >{card.color_1+'/'+card.color_2}</td>) : (
                  <td className={`md-only-table th_n bg-${card.color}`}>{card.color}</td>
                ))}

                <td className='md-only-table th_n th-border'>
                  <b>{card.power}</b>
                </td>
                <td className={'md-only-table th_n th-border bg-'+card.attribute}>
                  {card.attribute}
                </td>
                {(card.card_type === "Leader") ? (<td className='th_type bg-dark'>{card.card_type}</td>) : ('')}
                {(card.card_type === "Character") ? (<td className='th_type'>{card.card_type}</td>) : ('')}
                {(card.card_type === "Stage") ? (<td className='th_type'>{card.card_type}</td>) : ('')}
                {(card.card_type === "Event") ? (<td className='th_type bg-event'>{card.card_type}</td>) : ('')}
              </tr>
            ))
          ) : ('')}
        </tbody>
      </table>
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

export default OPSetCardTable