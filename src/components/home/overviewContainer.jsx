import React, { useState, useEffect } from "react";
import '../../styles/overviewContainer.css'
import CaseDataBox from './caseData.jsx'
import CasesChart from "./caseChart";
// import dateFormat from 'dateformat';

function OverviewContainer({data}) {
    // const [dt, setDt] = useState(new Date().toLocaleString());
    

    // useEffect(() => {
    //     // getData()
    //     let secTimer = setInterval( () => {
    //         setDt(new Date().toLocaleString())
    //     },1000)

    //     return () => {
    //         clearInterval(secTimer)
    //     };
   
    // }, []);


    //TO-DO: Change date format into dddd, mmmm, dS, yyyy
    return(
        <div className = "overview-cont">
            <div className = "headings">
                {/* <h1>COVID-19 Dashboard</h1> */}
                <p>General Overview as of <b>Aug. 20, 2021</b></p>
            </div>
            <div className = "case-data-ov">
                <CaseDataBox data = {data}/>
            </div>
        </div>
    );
}
export default OverviewContainer;