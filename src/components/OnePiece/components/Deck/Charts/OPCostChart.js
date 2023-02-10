import React, {useState,useEffect} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

function OPCostChart({deckCards}) {
  const [data, setData] = useState([])

  useEffect(() => {
    setData([
      { name: '1',
        Red: deckCards.filter(card =>card.cost === 1 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
        Green: deckCards.filter(card =>card.cost === 1 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
        Blue: deckCards.filter(card =>card.cost === 1 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
        Purple: deckCards.filter(card =>card.cost === 1 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
      },{ name: '2',
        Red: deckCards.filter(card =>card.cost === 2 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
        Green: deckCards.filter(card =>card.cost === 2 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
        Blue: deckCards.filter(card =>card.cost === 2 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
        Purple: deckCards.filter(card =>card.cost === 2 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
      },{ name: '3',
        Red: deckCards.filter(card =>card.cost === 3 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
        Green: deckCards.filter(card =>card.cost === 3 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
        Blue: deckCards.filter(card =>card.cost === 3 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
        Purple: deckCards.filter(card =>card.cost === 3 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
      },{ name: '4',
        Red: deckCards.filter(card =>card.cost === 4 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
        Green: deckCards.filter(card =>card.cost === 4 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
        Blue: deckCards.filter(card =>card.cost === 4 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
        Purple: deckCards.filter(card =>card.cost === 4 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
      },{ name: '5',
        Red: deckCards.filter(card =>card.cost === 5 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
        Green: deckCards.filter(card =>card.cost === 5 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
        Blue: deckCards.filter(card =>card.cost === 5 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
        Purple: deckCards.filter(card =>card.cost === 5 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
      },{ name: '6',
        Red: deckCards.filter(card =>card.cost === 6 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
        Green: deckCards.filter(card =>card.cost === 6 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
        Blue: deckCards.filter(card =>card.cost === 6 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
        Purple: deckCards.filter(card =>card.cost === 6 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
      },{ name: '7',
        Red: deckCards.filter(card =>card.cost === 7 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
        Green: deckCards.filter(card =>card.cost === 7 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
        Blue: deckCards.filter(card =>card.cost === 7 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
        Purple: deckCards.filter(card =>card.cost === 7 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
      },{ name: '8',
        Red: deckCards.filter(card =>card.cost === 8 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
        Green: deckCards.filter(card =>card.cost === 8 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
        Blue: deckCards.filter(card =>card.cost === 8 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
        Purple: deckCards.filter(card =>card.cost === 8 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
      },{ name: '9',
        Red: deckCards.filter(card =>card.cost === 9 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
        Green: deckCards.filter(card =>card.cost === 9 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
        Blue: deckCards.filter(card =>card.cost === 9 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
        Purple: deckCards.filter(card =>card.cost === 9 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
      },{ name: '10',
        Red: deckCards.filter(card =>card.cost === 10 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
        Green: deckCards.filter(card =>card.cost === 10 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
        Blue: deckCards.filter(card =>card.cost === 10 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
        Purple: deckCards.filter(card =>card.cost === 10 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
      }
    ])
  }, [deckCards]);

  return (
    <div className='mr-3'>
      <div className='color-lighter text-center mr-5'>Cost Breakdown</div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          width={500}
          height={250}
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="Red" stackId="a" fill="#BE171A" />
          <Bar dataKey="Green" stackId="a" fill="#007A59" />
          <Bar dataKey="Blue" stackId="a" fill="#2D77B5" />
          <Bar dataKey="Purple" stackId="a" fill="#893376" />
          <XAxis dataKey="name" stroke="white" />
          <YAxis stroke="white" />
        </BarChart>
      </ ResponsiveContainer>
    </div>
  );
}

export default OPCostChart;