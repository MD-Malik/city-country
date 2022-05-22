import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { InputFeild } from "./inputData";
import { LinearIndeterminate } from "./loading";
import { ShowData } from "./showData";
import styled from "styled-components"

const Nav = styled.nav`
background: green;
display : flex; 
flex-direction : row;
justify-content : right;
&>div{
    color : white;
    display : flex;
    flex-Direction : row;
    justify-Content : space-around;
    width : 350px;
    font-size : 20px;
    &>a{
        color :White;
        text-decoration : none;
        padding : 10px 10px;
        &:hover{
            background : blue;
        }
    }
}`

export const Home = () => {
    const isLoading = useSelector(state=>state.loadingReducer.isLoading);

    return (
       <>
       <Nav>
           <div>
           <Link to="/">Home</Link>
           <Link to="/add-city">Add City</Link>
           <Link to="/add-country">Add Country</Link>
           </div>
       </Nav>
       <span hidden={isLoading==true?false:true}><LinearIndeterminate /></span>
       {/* <InputFeild /> */}
       {/* <ShowData /> */}
       </>
    )
}