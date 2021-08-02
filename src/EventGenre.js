import React from 'react';
import { useEffect,useState } from 'react';
import { PieChart, Pie, Legend, Cell, ResponsiveContainer } from 'recharts';

//  useState hook to set the state when there’s events... state here :getData
function EventGenre({events}){
const [data,setData] = useState([]);
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//split(' ') each summary by space to turn the summary into an array of words.
//  array method includes  filter’s true or false value to check if the summary array created includes the genre  

const getData = () => {
  const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS'];
  const data = genres.map((genre)=>{
    const value = events.filter(({summary}) => {
      return summary
      .split(' ')
      .includes(genre)
    }).length;
    return{name:genre,value};
  });
  return data;
}
//  force the EventsGenre to re-render once the events data is available using React’s hooks: useEffect and useState.
// The useEffect function will run when there’s a change to the events prop
useEffect(()=>{
  setData(()=> getData())
},[events]);

return(
      <ResponsiveContainer  height={400}>
        <PieChart margin={{top: 10, right: 10, bottom: 20, left: 10,}}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
             legendType='square'
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({percent}) => ` ${(percent * 100).toFixed(0)}%`}
          >
          
            { data.map((entry, index) => <Cell key={`cell-${index}`} fill={colors[index]} />)}
          </Pie>
           <Legend layout="horizontal" align="center" verticalAlign="bottom"></Legend>
        </PieChart>
      </ResponsiveContainer>
    );
}
export default EventGenre;