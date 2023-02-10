import React, {useState,useEffect} from 'react';
import { PieChart, Pie, Sector,Legend, Cell, ResponsiveContainer } from 'recharts';

function OPTypeChart({deckCards}) {
  const [data, setData] = useState([])


  useEffect(() => {
    const characterL = deckCards.filter(card => card.card_type === "Character").length
    const eventsL = deckCards.filter(card => card.card_type === "Event").length
    const stageL = deckCards.filter(card => card.card_type === "Stage").length

    setData([
      { name: 'Character', value: characterL},
      { name: 'Event', value: eventsL},
      { name: 'Stage', value: stageL},
    ])
  }, [deckCards]);

  const TYPES = ['Characters', 'Events', 'Stages'];
  const COLORS = ['#2b416b', '#d6b55a', '#326bb5'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} className="custom-label__txt" dominantBaseline="central">
        {data[index].value} {TYPES[index]}
      </text>
    );
  };


  if (deckCards) {
    return (
      <div className='mr-3'>
        <div className='color-lighter text-center mr-5'>Card Type Breakdown</div>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart width={800} height={400} >
            <Pie
              data={data}
              // cx={120}
              // cy={200}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <>
                  <Legend layout="horizontal" verticalAlign="top" align="center" />
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                </>
              ))}
            </Pie>
          </PieChart>
        </ ResponsiveContainer>
      </div>
    );
  }
}

export default OPTypeChart;