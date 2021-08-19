import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import RegionalTable from './regionalTable';
import '../../styles/regional.css'

const Regional = (props) => {

    const [totals, setTotals] = useState([])
    const [daily, setDaily] = useState([])

    useEffect(() => {
        console.log("In regional page")
        try {
            const getData = async() => {
                const response = await axios.get('http://localhost:5000/regional')
                setTotals(response.data.data.totals)
                setDaily(response.data.data.daily)
            }
            getData()
        } 
        catch(err) {
            console.log(err)
        }
    }, [])

    console.log(totals)
    console.log(daily)

    return (
        <div className="regional-main-container">
            <div className="heading-container">
                <h1>Regional Cases</h1>
                <h2>Total cases per region as of August __, 2021</h2>
            </div>

            <div className="regional-chart-container">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={600}
                        height={300}
                        data={totals}
                        margin={{
                            top: 7,
                            right: 30,
                            left: 20,
                            bottom: 7,
                        }}
                        >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="region" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="cases" fill="#8884d8" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
            
            <div className="regional-chart regional-chart1">
                <RegionalTable data={daily}/>
            </div>
        </div>
    )
}


export default Regional