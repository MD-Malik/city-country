import React from "react";
import { Route, Routes } from "react-router";
import { CityPage } from "./cityPage";
import { CountryPage } from "./coutryPage";
import { HomePage } from "./homePage";

export const AllRoutes = () => {
    return (
        <>
         <Routes>
             <Route path="/" element={<HomePage />}/>
             <Route path="/add-city" element={<CityPage />}/>
             <Route path="/add-country" element={<CountryPage />} />
         </Routes>
        </>
    )
}