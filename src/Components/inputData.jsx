import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../Redux/action";
import { setLoading } from "../Redux/loading/loadingAction";
import { ArrowTooltips } from "./addButton";
import { LinearIndeterminate } from "./loading";
import styled from "styled-components"

const Div = styled.div`

display : flex;
flex-direction : column;
background : green;
width : fit-content;
margin : 50px auto;
padding : 30px 25px;
&>div:nth-child(1){
    margin-bottom : 40px;
    font-size : 25px;
}
&>div:nth-child(2){
  display : grid; 
  grid-template-columns : auto;
  gap : 50px;
  justify-content : space-around;
  &>input{
    width : 350px;
    height : 40px;
    font-size : 20px;
    border-radius : 5px;
  }
  &>span{
    background : blue;
    &:hover{
      cursor : pointer;
      border-radius : 5px;
      background : orange
    }
  }
}
`

export const InputFeild = () => {
  const isLoading = useSelector(state=>state.loadingReducer.isLoading);
  const [suggestedCountries, setSuggestedCountries] = useState([])
  const dispatch = useDispatch();
  const [inputData, setInputData] = useState({
    city : "",
    country : "",
    population : ""
  })    
  const [timeOutId, setTimeOutId] = useState("")

  const handleChange = (e) => {
     setInputData({
       ...inputData,
       [e.target.className] : e.target.className=="population"?+e.target.value:e.target.value
     })
  }

  const handleAdd = () => {
    clearTimeout(timeOutId)
    dispatch(setLoading(true))

    setTimeOutId(setTimeout(() => {
      fetch('https://my-cityapp.herokuapp.com/cities', {
      method : "POST",
      body : JSON.stringify(inputData),
      headers : {
        "Content-Type":"application/json"
      }
    })
    .then(res=>res.json())
    .then(res=>{
      fetch('https://my-cityapp.herokuapp.com/cities')
      .then(res=>res.json())
      .then(res=>{
        dispatch(addData(res))
        dispatch(setLoading(false));
      })
    })
    }, 1000));
    setInputData({
      ...inputData,
      city : "",
      population : "",
      country : ""
    })
  }
  const handleSearchCountry = (e) => {
    setInputData({
      ...inputData,
      country : e.target.value
    })
    if(e.target.value.length==0){
      setSuggestedCountries([]);
      return;
    }
    fetch(`https://my-cityapp.herokuapp.com/countries?q=${e.target.value}`)
    .then(res=>res.json())
    .then(res=>setSuggestedCountries(res))
  }
  const {city, population, country } = inputData
    return (
        <Div>
          <div><label>Add New City</label></div>
          <div>
           <input type="text" placeholder="City Name" className="city" onChange={handleChange} value={city}/>
           <input type="text" placeholder="Population of city" className="population" onChange={handleChange} value={population}/>
           <div>
           <input type="text" placeholder="Country it belongs" className="country" onChange={handleSearchCountry} value={country} style={{
    width : "350px",
    height : "40px",
    fontSize : "20px",
    borderRadius : "5px"
  }}/>
           <div style={{position : "absolute", width : "357px", background : "white", maxHeight : "300px", overflowY : "scroll"}}>
             {suggestedCountries.map(item=>{
               return(
                 <>
                  <div key={item.id} style={{background : "white", color : "black", border : "1px solid grey", padding : "7px 0", cursor : "pointer"}} onClick={()=>{setInputData({...inputData, country : item.name}); setSuggestedCountries([])}} value={inputData.country}>{item.name}</div>
                 </>
               )
             })}
           </div>
           </div>
           <span onClick={handleAdd}><ArrowTooltips /></span>
          </div>
        </Div>
    )
}