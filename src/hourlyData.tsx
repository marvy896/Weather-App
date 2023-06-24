import React, { PureComponent, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { hourly } from './weatherPage';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

// {data.hourly.map((key, value) => (
//     <div className="UIInner" key={value}>
//       <Item className="UIobjects">
//         <CloudIcon /> Clouds <div>{key.clouds}</div>
//       </Item>
//       <Item className="UIobjects">
//         <ThunderstormIcon /> Dew Point
//         <div>{key.dew_point}</div>
//       </Item>
//       <Item className="UIobjects">
//         {" "}
//         <AllInclusiveIcon /> UVI
//         <div>{key.uvi}</div>
//       </Item>
//       <Item className="UIobjects">
//         <TryIcon /> Pressure <div>{key.pressure}</div>
//       </Item>
//       <Item className="UIobjects">
//         <VisibilityIcon /> Visibility <div>{key.visibility}</div>
//       </Item>
//       <Item className="UIobjects">{key.pop}</Item>
//     </div>
//   ))}
export default function HourlyData({hourly}:{hourly:hourly}) {
    let [hourlyData, setHourlyData] = useState<any[]>([])


    useEffect(()=>{
        setHourlyData(hourly.map((value)=>({
           amt: value.uvi,
           time: new Date(value.dt * 1000).getHours()
           
        })
        )) 
    }, [])
    return (
      <div className='graph' >
        <LineChart
          width={1020}
          height={300}
          data={hourlyData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amt" stroke="#8884d8" activeDot={{ r: 8 }} />
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </div>
    );
  }

