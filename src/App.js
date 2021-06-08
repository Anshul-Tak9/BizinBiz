import React, { useState } from 'react'
import './App.css';
import {Tabs,Tab,AppBar, InputBase} from '@material-ui/core'
import Stastics from './Statistics'
import emp_data from './EmployeeDataset.json'
import {createStyles,fade,Theme,makeStyles} from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'

//useStyle is used to add styles in searchbox

const useStyles = makeStyles((theme) => ({
  search: {
    marginTop: 20,
    marginBottom: 10,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

//I calculate the avg. salary using nested loop and for efficiency I have used the hashMap.

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
/*
for searching , we just filter out that location which starts with the search input.
For better search I have added two object in employee_customer with location as India and Indiana so that 
for search of "in" will give result India and Indiana both.
*/
function App(){ 
      const classes = useStyles();
    const [selectedTab,setSelectedTab] = React.useState(0);
    const [searchTerm,setSearchTerm] = useState('');
    const handleChange = (event,newValue) => {
      setSelectedTab(newValue);
    }
    const details ={result : result , searchTer:searchTerm};
    return ( <div className="App">
        <AppBar position="static" >                           
        <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange = {e => {setSearchTerm(e.target.value)}}
              />
            </div>      
          <Tabs value = {selectedTab} onChange= {handleChange} variant="fullWidth">
            <Tab label="Data"></Tab>
            <Tab label="Statistics"></Tab>
          </Tabs>
        </AppBar>
        {selectedTab === 0 && 
        <div>
         <ul id='Data-ul'>
           <li>Location</li>
           <li>Salary</li>
         </ul>
         {result.filter((val)=>{
           if(searchTerm === "") {return val;}
           else if(searchTerm != "" && val.location.toLowerCase().startsWith(searchTerm.toLowerCase())) {return val;}
         }).map((data)=>
          {
            return <ul id="inside-ul">
              <li>{data.location}</li>
              <li>${Math.round(data.Salary)}</li>
            </ul>
          })
          }
         </div>
        }
        {selectedTab === 1 &&
              <Stastics info={details}/>
        }
        </div>
    );
}

export default App;
