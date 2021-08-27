import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, CustomTooltip, Legend, ResponsiveContainer } from 'recharts';
import RegionalTable from './regionalTable';
import '../../styles/regional.css'

const Regional = (props) => {

    const [totals, setTotals] = useState([])
    const [daily, setDaily] = useState([])

    const numFormatter = new Intl.NumberFormat('en-US')

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

    const CustomizedAxisTick = (props) => {
        const { x, y, payload } = props;
        return (
            <g transform={`translate(${x},${y})`}>
                <text
                    x={0}
                    y={0}
                    dy={16}
                    textAnchor="end"
                    fill="#666"
                    transform="rotate(-35)"
                >
                    {payload.value}
                </text>
            </g>
        );
    };
    
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            // console.log(payload)
            return (
                <div className="daily-graph-tooltip">
                    <p style={{textAlign:'center'}}><b>{label}</b></p>
                    <p>Total Cases : {numFormatter.format(payload[0].payload["Total"])}</p>
                    <p>Active Cases : {numFormatter.format(payload[0].payload["Active Cases"])}</p>
                    <p>Recoveries : {numFormatter.format(payload[0].payload["Recoveries"])}</p>
                    <p>Deaths : {numFormatter.format(payload[0].payload["Deaths"])}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="regional-main-container">
            <div className="heading-container">
                <h1>Regional Cases</h1>
                <h2>Total cases per region as of August 20, 2021</h2>
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
                        <XAxis dataKey="Region" tick={<CustomizedAxisTick />} height={70} interval={0} />
                        <YAxis dataKey="Total" tickFormatter={tick => numFormatter.format(tick)} />
                        {/* <Tooltip formatter={value => numFormatter.format(value)} /> */}
                        <Tooltip content={<CustomTooltip />} />
                        <Legend />
                        {/* <Bar dataKey="Total" fill="#8884d8" /> */}
                        <Bar dataKey="Active Cases" stackId="a" fill="#FDBF49" />
                        <Bar dataKey="Recoveries" stackId="a" fill="#8AD085" />
                        <Bar dataKey="Deaths" stackId="a" fill="#702F6B" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="heading-container">
                <h2>Timeline of cases per region</h2>
            </div>

            <div className="regional-chart regional-chart1">
                <RegionalTable data={daily}/>
            </div>
        </div>
    )
}


export default Regional