import React  from 'react';
import {Link} from 'react-router-dom';
import { Image} from 'react-bootstrap';

const OPSetCardTable = ({cards}) => {

  if (cards) {
    return (
      <table className='bg-Gray rounded set__table'>
        <thead>
          <tr>
            <th className='th_n'>Number</th>
            <th className=''></th>
            <th><b className='ml-2'>Title</b></th>
            <th className='th_n th-border '>Cost/Life</th>
            <th className='th_n th-border'>Color</th>
            <th className='th_n th-border'>Power</th>
            <th className='th_n th-border'>Attribute</th>
            <th className='th_type th-border'>Type</th>
          </tr>
        </thead>
        <tbody>
          {(cards !== []) ? (
            cards.map((card) => (
              <tr>
                {(card.color_2 ? (
                  <td className={`th_n bg-${card.color_1}-${card.color_2}`} >
                    {card.card_n}
                    </td>) : (
                  <td className={`th_n bg-${card.color}`}>{card.card_n}</td>
                ))}
                <td className='th_rarity'>{card.rarity}</td>

                <Link className='w-100 th_title' to={`/one-piece/card/${card.card_n}`}><td className='th_title'>{card.title}</td></Link>
                
                <td className='th_n th-border'><b>{card.cost}</b></td>
                {(card.color_2 ? (
                  <td className={`th_n bg-${card.color_1}-${card.color_2}`} >{card.color_1+'/'+card.color_2}</td>) : (
                  <td className={`th_n bg-${card.color}`}>{card.color}</td>
                ))}

                <td className='th_n th-border'><b>{card.power}</b></td>
                <td className={'th_n th-border bg-'+card.attribute}>{card.attribute}</td>
                <td className='th_type'>{card.card_type}</td>
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