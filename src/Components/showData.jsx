import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../Redux/action";
import { dataReducer } from "../Redux/reducer";
import styled from "styled-components"
import { setLoading } from "../Redux/loading/loadingAction";
import BasicModal from "./editModal";
import IconLabelButtons from "./deleteButton";

const Table = styled.div`
// background : blue;
width : max-Content;
margin : 30px auto;
font-Size : 20px;
`
const Th = styled.th`
padding : 15px 40px;
`

export const ShowData = () => {
  const data = useSelector(state=>state.dataReducer.data);
  const isLoading = useSelector(state=>state.loadingReducer.isLoading);

  const dispatch = useDispatch();
  const [timeOutId, setTimeOutId] = useState("")

  useEffect(()=>{
    fetch('https://my-cityapp.herokuapp.com/cities')
    .then(res=>res.json())
    .then(res=>dispatch(addData(res)))
  },[])

  const handleDelete = (id) => {
    clearTimeout(timeOutId)
    dispatch(setLoading(true))    
     setTimeOutId(setTimeout(() => {
      
     fetch(`https://my-cityapp.herokuapp.com/cities/${id}`, {
      method : "DELETE",
      headers : {
        "Content-Type": "application/json"
      }
    })
    .then(res=>res.json())
    .then(res=>{
      fetch('https://my-cityapp.herokuapp.com/cities')
      .then(res=>res.json())
      .then(res=>{
        dispatch(addData(res));
        dispatch(setLoading(false))
      })
    })
    }, 1000));   
  }

    return (
        <Table>
           <table>
             <thead>
               <tr>
                 <Th>id</Th>
                 <Th>Country</Th>
                 <Th>City</Th>
                 <Th>Population</Th>
                 <Th>Edit</Th>
                 <Th>Delete</Th>
               </tr>
             </thead>
             <tbody>
               {data.map(item=>(                 
                 <tr key={item.id}>
                   <td>{item.id}</td>
                   <td>{item.country}</td>
                   <td>{item.city}</td>
                   <td>{item.population}</td>
                   <td><span><BasicModal id={item.id}/></span></td>
                   <td><span onClick={()=>handleDelete(item.id)}><IconLabelButtons /></span></td>
                 </tr>
                 ))}
             </tbody>
           </table>
        </Table>
    )
}