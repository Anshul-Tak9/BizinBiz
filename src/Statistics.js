import React from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

/*
we take props result and search term in form of object so that it get reference from App.js file
Then, we have filter out that location which starts with searchTerm and represent in bar graph 
and for each change in search term both data and statistics change simultaneously.
*/

export default function Stastics(props) {
  const result =  props.info.result;
  const searchTerm =  props.info.searchTer;
  var ans=[];
  return (
    <div>
     
      {result.filter((val)=>{
           if(searchTerm === "") {return val;}
           if(searchTerm != "" && val.location.toLowerCase().startsWith(searchTerm.toLowerCase())) {return val;}
         }).map((data)=>
          { if(data){
            ans.push(data);
          }
          })
          }
        <BarChart
          width={1000}
          height={600}
          data={ans}
          margin={{
            top: 30,
            right: 20,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="location" />
          <YAxis dataKey = "Salary"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="Salary" fill="#8884d8" />
        </BarChart>
    </div>
  );
}
