import React from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function OPCostChart({deckCards}) {

  const data = [
    { name: '1',
      red: deckCards.filter(card =>card.cost === 1 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
      green: deckCards.filter(card =>card.cost === 1 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
      blue: deckCards.filter(card =>card.cost === 1 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
      purple: deckCards.filter(card =>card.cost === 1 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
    },{ name: '2',
      red: deckCards.filter(card =>card.cost === 2 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
      green: deckCards.filter(card =>card.cost === 2 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
      blue: deckCards.filter(card =>card.cost === 2 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
      purple: deckCards.filter(card =>card.cost === 2 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
    },{ name: '3',
      red: deckCards.filter(card =>card.cost === 3 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
      green: deckCards.filter(card =>card.cost === 3 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
      blue: deckCards.filter(card =>card.cost === 3 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
      purple: deckCards.filter(card =>card.cost === 3 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
    },{ name: '4',
      red: deckCards.filter(card =>card.cost === 4 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
      green: deckCards.filter(card =>card.cost === 4 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
      blue: deckCards.filter(card =>card.cost === 4 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
      purple: deckCards.filter(card =>card.cost === 4 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
    },{ name: '5',
      red: deckCards.filter(card =>card.cost === 5 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
      green: deckCards.filter(card =>card.cost === 5 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
      blue: deckCards.filter(card =>card.cost === 5 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
      purple: deckCards.filter(card =>card.cost === 5 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
    },{ name: '6',
      red: deckCards.filter(card =>card.cost === 6 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
      green: deckCards.filter(card =>card.cost === 6 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
      blue: deckCards.filter(card =>card.cost === 6 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
      purple: deckCards.filter(card =>card.cost === 6 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
    },{ name: '7',
      red: deckCards.filter(card =>card.cost === 7 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
      green: deckCards.filter(card =>card.cost === 7 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
      blue: deckCards.filter(card =>card.cost === 7 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
      purple: deckCards.filter(card =>card.cost === 7 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
    },{ name: '8',
      red: deckCards.filter(card =>card.cost === 8 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
      green: deckCards.filter(card =>card.cost === 8 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
      blue: deckCards.filter(card =>card.cost === 8 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
      purple: deckCards.filter(card =>card.cost === 8 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
    },{ name: '9',
      red: deckCards.filter(card =>card.cost === 9 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
      green: deckCards.filter(card =>card.cost === 9 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
      blue: deckCards.filter(card =>card.cost === 9 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
      purple: deckCards.filter(card =>card.cost === 9 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
    },{ name: '10',
      red: deckCards.filter(card =>card.cost === 10 && (card.color_1 === 'Red' || card.color_2 === 'Red')).length,
      green: deckCards.filter(card =>card.cost === 10 &&  (card.color_1 === 'Green' || card.color_2 === 'Green')).length,
      blue: deckCards.filter(card =>card.cost === 10 &&  (card.color_1 === 'Blue' || card.color_2 === 'Blue')).length,
      purple: deckCards.filter(card =>card.cost === 10 &&  (card.color_1 === 'Purple' || card.color_2 === 'Purple')).length,
    }
  ];



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
          <Bar dataKey="red" stackId="a" fill="#BE171A" />
          <Bar dataKey="green" stackId="a" fill="#007A59" />
          <Bar dataKey="blue" stackId="a" fill="#2D77B5" />
          <Bar dataKey="purple" stackId="a" fill="#893376" />
          <XAxis dataKey="name" stroke="white" />
          <YAxis stroke="white" />
        </BarChart>
      </ ResponsiveContainer>
    </div>
  );
}

export default OPCostChart;