import * as React from 'react';
import Button from '@mui/material/Button';
import { addData } from '../Redux/action';
import { useDispatch } from 'react-redux';

export default function SortAscending() {

  const dispatch = useDispatch()

  const handleSortAsc = () => {
    fetch('https://my-cityapp.herokuapp.com/cities')
    .then(res=>res.json())
    .then(res=>{
      res.sort(function(a,b){
        return a.population - b.population;
      });
      dispatch(addData(res));
    })
  }

  return (
      <Button variant="outlined" sx={{height : "40px", margin : "15px 15px", width : "360px"}} onClick={handleSortAsc}>Sort by population in ascending order</Button>
 );
}
