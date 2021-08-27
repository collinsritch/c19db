import React, { useState } from 'react'
import '../../styles/regionalOverview.css'
import RegionalPieChart from './regionalPieChart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect } from 'react'
import Loader from './loader'
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';
import regionalCaseData from '../regional/regionalCaseData'

const RegionNames = {
    BARMM: "BARMM",
    CAR: "CAR",
    NCR: "NCR",
    R1: "Ilocos Region",
    R2: "Cagayan Valley",
    R3: "Central Luzon",
    R4a: "CALABARZON",
    R4b: "MIMAROPA",
    R5: "Bicol Region",
    R6: "Western Visayas",
    R7: "Central Visayas",
    R8: "Eastern Visayas",
    R9: "Zamboangaa Peninsula",
    R10: "Northern Mindanao",
    R11: "Davao Region",
    R12: "Soccsksargen",
    CARAGA: "CARAGA",
    ROF: "ROF"
}

function formatData(data) {
    console.log("in formatData function")
  
    const formattedData = []
    Object.keys(data).forEach((d) => {
      if(d != 'total') {
        formattedData.push({
          name: d,
          value: data[d]
        })
      }
    })  
    
    return formattedData
}

const RegionalOverview = (props) => {
    // const [provinceTotals, setProvinceTotals] = useState([])
    // const [regions, setRegions] = useState([])
    // const [chartData, setChartData] = useState([])  

    // useEffect(() => {   
    //     async function getRegionalData() {
    //         try {
    //             const response = await axios.get('http://localhost:5000/regional')
    //             setProvinceTotals(response.data.data.provinceTotals)
    //             setRegions(Object.keys(response.data.data.provinceTotals))
    //         } catch(err) {
    //             console.log(err)
    //         }
    //     }
    //     getRegionalData()
        
    // }, [])

    const provinceTotals = regionalCaseData.provinceTotals
    const regions = Object.keys(regionalCaseData.provinceTotals)
    const chartData = []
    
    regions.forEach((r) => {
        chartData.push(formatData(provinceTotals[r]))
    })

    console.log(chartData)
    


    return(
        <>
            {/* <div className="heading">
                <h1>Regional Cases Overview</h1>
            </div> */}

            <div className="regional-overview-container">
                <div className="region-container region-container1">              
                    <RegionalPieChart chartColor="#FF716E" data={chartData[0]} name={regions[0]}/>
                    <h2>{RegionNames[regions[0]]}</h2>
                </div>

                <div className="region-container region-container1">              
                    <RegionalPieChart chartColor="#67D0E9" data={chartData[1]} name={regions[1]}/>
                    <h2>{RegionNames[regions[1]]}</h2>
                </div>

                <div className="region-container region-container1">              
                    <RegionalPieChart chartColor="#64B88D" data={chartData[2]} name={regions[2]}/>
                    <h2>{RegionNames[regions[2]]}</h2>
                </div>

                <div className="region-container region-container1">              
                    <RegionalPieChart chartColor="#FF9B05" data={chartData[3]} name={regions[3]}/>
                    <h2>{RegionNames[regions[3]]}</h2>
                </div>

            </div>  

            {/* <div className="see-more-regional">
                <a href="/regional"><h3> Regional Statistics And Analyses </h3></a>
            </div> */}
        </>
    )
}

export default RegionalOverview