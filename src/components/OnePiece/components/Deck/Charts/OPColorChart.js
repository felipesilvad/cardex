import React, {useState,useEffect} from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

function OPColorChart({deckCards}) {
  const [data, setData] = useState([])


  useEffect(() => {
    const redL = deckCards.filter(card => !!card.color_1&&(card.color_1 === 'Red' || card.color_2 === 'Red')).length
    const greenL = deckCards.filter(card => !!card.color_1&&(card.color_1 === 'Green' || card.color_2 === 'Green')).length
    const blueL = deckCards.filter(card => !!card.color_1&&(card.color_1 === 'Blue' || card.color_2 === 'Blue')).length
    const purpleL = deckCards.filter(card => !!card.color_1&&(card.color_1 === 'Purple' || card.color_2 === 'Purple')).length

    setData([
      { name: 'Red', value: redL},
      { name: 'Green', value: greenL},
      { name: 'Blue', value: blueL},
      { name: 'Purple', value: purpleL},
    ])
  }, [deckCards]);

  const COLORS = ['#BE171A', '#007A59', '#2D77B5', '#893376'];


  if (deckCards) {
    return (
      <div className='mr-3'>
        <div className='color-lighter text-center mr-5'>Color Breakdown</div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart width={800} height={400} >
            <Pie
              data={data}
              // cx={120}
              // cy={200}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              stroke="none"
              label={true} labelLine={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ ResponsiveContainer>
      </div>
    );
  }
}

export default OPColorChart;