import React, { useEffect,useState } from 'react';
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
import axios from 'axios'
import dateFormat from 'dateformat'

export default function CasesChart({data}) {
    // const [data, setData] = useState({});

    const numFormatter = new Intl.NumberFormat('en-US')

    // load Data from server
    // useEffect(() => {
    //     try{
    //         let chartData;
    
    //         async function getData() {
    //             const response = await axios.get('http://localhost:5000/home')
    //             chartData = response.data.data

    //             setData(chartData.counts)
    //         }
    //         getData()
    //     }catch (e){
    //         console.error(e)
    //     }
    // }, []);
    // console.log(data)

    // make function that follows rechart's data format
    // const daily = [
    //     {
    //         "date": date,
    //         "newcases": cases,
    //     }
    // ]

    
    // console.log(data)

    var dailyArr=[]
    function reformatDaily() {
        let a;
        for(a in data.counts.daily){
            dailyArr.push(
                {"date":dateFormat(a,"mediumDate"), 
                "New Cases": data.counts.daily[a].newCase,
                "Recoveries": data.counts.daily[a].recovery,
                "Deaths": data.counts.daily[a].death,
                // "Cumulative Deaths up to this Day": data.daily[a].cumulative,
                "Cumulative": data.counts.daily[a].cumulative,
                }
            )       
        }
    }

    reformatDaily();
    // console.log(dailyArr);

    const CustomTooltip = ({ active, payload, label }) => {
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

    return (
            <div className = "main-chart">
                <ResponsiveContainer  width="100%" height="100%">
                    <LineChart
                    width={1150}
                    height={340}
                    data={dailyArr}
                    margin={{
                        top: 0,
                        right: 0,
                        left: 0,
                        bottom: 0,
                    }}
                    >
                        
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date"  tick = {{fontSize: 11}}/>
                        <YAxis dataKey="New Cases" tickFormatter={tick => numFormatter.format(tick)} />
                        <Tooltip content={<CustomTooltip/>}/>
                        <Line type="monotone" dataKey="New Cases" stroke="rgba(33,147,176,1)" dot = {{r:1}} activeDot={{ r: 4 }} />
                        <Legend />
                    </LineChart>
                </ResponsiveContainer>
            </div>
    );
}
