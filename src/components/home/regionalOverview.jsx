import React, { useState } from 'react'
import '../../styles/regionalOverview.css'
import RegionalPieChart from './regionalPieChart'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { useEffect } from 'react'

const RegionalOverview = (props) => {

    const [provinceTotals, setProvinceTotals] = useState([])
    const [regions, setRegions] = useState([])

    useEffect(() => {
        try{
            async function getRegionalData() {
                const response = await axios.get('http://localhost:5000/regional')
                setProvinceTotals(response.data.data.provinceTotals)
                setRegions(Object.keys(provinceTotals))
            }
            getRegionalData()
        }catch (e){
            console.log('Error on fetching data from vaccinations route', e)
        }
    }, []);
    console.log(provinceTotals);
    console.log(regions);


    return(
        <>
            <div className="heading">
                <h1>Regional Cases Overview</h1>
            </div>
        
            <div className="regional-overview-container">
                <div className="region-container region-container1">
                    <RegionalPieChart chartColor="#67D0E9" data={provinceTotals[regions[0]]} name={regions[0]}/>
                    <h2>Metro Manila</h2>
                </div>

                <div className="region-container region-container2">
                    <RegionalPieChart chartColor="#FF716E"/>
                    <h2>Calabarzon</h2>
                </div>  

                <div className="region-container region-container3">
                    <RegionalPieChart chartColor="#64B88D"/>
                    <h2>Central Luzon</h2>
                </div>

                <div className="region-container region-container4">
                    <RegionalPieChart chartColor="#FF9B05"/>
                    <h2>Central Visayas</h2>
                </div>
            </div>  

            <div className="see-more-regional">
                <a href="/regional"><h3> Regional Statistics And Analyses </h3></a>
            </div>
        </>
    )
}

export default RegionalOverview