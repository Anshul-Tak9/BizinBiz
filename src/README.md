For **run/test** just do **npm start**

**Avg Salary Calculation**
<br><br>
For each particular location I iterate through the data for same location and add in avg salary and then divide by the no of same location.
Used Hash map for more efficiency . Map just store the location we have covered and then we skip that location which is stored in Map.
For more documentation I have attach an code snippet .
```
var x= emp_data;
var map = new Map();    //HashMap for saving location which we already visited.
var result=[];
for (var i=0;i<x.length;i++){
  if(!map.has(x[i]['location'])){   //if location is not visited
    var n = 1;                       // n : count the number of customer in that location and it is used for calculating mean salary for that location
    var currS = parseInt(x[i]['currSalary'].substr(1)); 
    var avg_salary = currS;
    var loc = x[i]['location'];
    for(var j=i+1;j<x.length;j++){
        if(loc === x[j]['location']){  //if jth location matched with ith then we add in avg. salary .
          currS = parseInt(x[j]['currSalary'].substr(1)); 
          avg_salary += currS;    
          n++;
        }
    }
    map.set(loc,result.length);             // storing the location in the map with the index of location stored in final result array.
    result.push({location:loc, Salary:avg_salary/n });  //once we have count the customer with same location we will add that in the result array.
  }
}
result.sort((a,b)=>{
  return b['Salary']-a['Salary'];   // sort the result array in decreasing order.
})

```

**Simultaneous Search**
<br><br>
We filter that object which has location starts with the searchTerm and same done in bar graph(statistics) and both display changes according to search changes. For more clearity look into code snippet.<br>
For better search result I had added the two more countries India and Indiana so that if serach result in "In" then It gives India and Indiana and represent graph for two only.
```
result.filter((val)=>{
           if(searchTerm === "") {return val;}
           else if(searchTerm != "" && val.location.toLowerCase().startsWith(searchTerm.toLowerCase())) {return val;}
         }).map((data)=>
          {
            return <ul id="inside-ul">
              <li>{data.location}</li>
              <li>${Math.round(data.Salary)}</li>
            </ul>
          })
```