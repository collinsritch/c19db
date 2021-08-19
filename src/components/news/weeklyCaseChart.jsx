import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";
import dateFormat from 'dateformat' 

const WeeklyCaseChart = (props) => {
    const numFormatter = new Intl.NumberFormat('en-US')

    const [data, setData] = useState({});

    useEffect(() => {
        try{
            let chartData;
    
            async function getData() {
                const response = await axios.get('http://localhost:5000/home')
                chartData = response.data.data

                setData(chartData.counts)
            }
            getData()
        }catch (e){
            console.error(e)
        }
    }, []);

    var weeklyArr=[]
    function reformatWeekly() {
        let a;
        for(a in data.weekly){
            weeklyArr.push(
                {"date":dateFormat(a,"mediumDate"), 
                "New Cases": data.weekly[a].newCase,
                "Recoveries": data.weekly[a].recovery,
                "Deaths": data.weekly[a].death,
                "Cumulative": data.weekly[a].cumulative,
                }
                )       
        }
    }

    reformatWeekly();

    const WeeklyTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            // console.log(payload)
            return (
            <div className="daily-graph-tooltip">
                <p className="tooltip-date">{`${label}`}</p>
                <p className="tooltip-data"><b>Cases: </b>{`${numFormatter.format(payload[0].value)}`}</p>
                <p className="tooltip-data"><b>Recoveries:</b> {`${numFormatter.format(payload[0].payload["Recoveries"])}`}</p>
                <p className="tooltip-data"><b>Deaths:</b> {`${numFormatter.format(payload[0].payload["Deaths"])}`}</p>
                <p className="tooltip-data"><b>Cumulative Cases:</b> <br/>{`${numFormatter.format(payload[0].payload["Cumulative"])}`}</p>
            </div>
            );
        }
        return null;
    };

    return(
        <div className = "main-chart">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart
            // width={100%}
            // height={100%}
            data={weeklyArr}
            margin={{
                top: 20,
                right: 20,
                left: 20,
                bottom: 20,
            }}
            >
                
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date"  tick = {{fontSize: 11}}/>
                <YAxis dataKey="New Cases" />
                <Tooltip content={<WeeklyTooltip/>}/>
                <Line type="monotone" dataKey="New Cases" stroke="rgba(33,147,176,1)" dot = {{r:1}} activeDot={{ r: 4 }} />
                <Legend />
            </LineChart>
        </ResponsiveContainer>
    </div>



    )
}

export default WeeklyCaseChart