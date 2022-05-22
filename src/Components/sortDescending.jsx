import * as React from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addData } from '../Redux/action';

export default function SortDescending() {
  // var data = useSelector(state=>state.dataReducer.data)
  const dispatch = useDispatch()

  const handleSortDesc = () => {
    fetch('https://my-cityapp.herokuapp.com/cities')
    .then(res=>res.json())
    .then(res=>{
      res.sort(function(a,b){
        return b.population - a.population;
      });
      dispatch(addData(res));
    })
  }

  return (
      <Button variant="outlined" sx={{height : "40px", margin : "15px 15px", width : "380px"}} onClick={handleSortDesc}>Sort by population in descending order</Button>
 );
}
