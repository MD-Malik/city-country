import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';
import { addData } from '../Redux/action';
import SortAscending from './sortAscending';
import SortDescending from './sortDescending';

export default function SortFilter() {
  const [country, setCountry] = React.useState('');
  const [allCountries, setAllCountries] = React.useState([])
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setCountry(event.target.value);
    getReleventData(event.target.value);
  };

  const getReleventData = (query) => {
      fetch(`https://my-cityapp.herokuapp.com/cities?country_like=${query}`)
      .then(res=>res.json())
      .then(res=>{
          dispatch(addData(res));
      })
  }



  React.useEffect(()=>{
      fetch('https://my-cityapp.herokuapp.com/countries')
      .then(res=>res.json())
      .then(res=>setAllCountries(res))
  },[])

  return (
    <div style={{ width : "fit-Content", margin : "0 90% 0 10%", display : "flex"}}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 160 }}>
        <InputLabel id="demo-simple-select-standard-label">Filter by country</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={country}
          onChange={handleChange}
          label="Filter"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {allCountries.map(item=>{
              return(
                  <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
              )
          })}
        </Select>
      </FormControl>
      <SortAscending />
      <SortDescending />
    </div>
  );
}
