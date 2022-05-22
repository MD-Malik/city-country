import React, { useState } from "react";
import BasicButtons from "../Components/buttonComponent";

export const CountryPage = () => {
    const [inputValue, setInputValue] = useState("")

    const handleAddCountry=()=> {
        fetch(`https://my-cityapp.herokuapp.com/countries/?name_like=${inputValue}`)
        .then(res=>res.json())
        .then(res=>{
            if(res.length!=0){
                alert("Country already exist")
                return;
            }
            fetch('https://my-cityapp.herokuapp.com/countries', {
                method : "POST",
                headers : {
                    "Content-Type":"application/json"
                },
                body : JSON.stringify({name : inputValue})
            })
            .then(res=>res.json())
            .then(res=>alert("Country successfully added"))
        })
    }

    return (
        <>
          <h1>Add New Country</h1>
          <input type="text" placeholder="Enter Country" onChange={(e)=>{setInputValue(e.target.value)}} style={{height : "25px", width : "250px"}}/>
          <span onClick={handleAddCountry}><BasicButtons /></span>
          
        </>
    )
}