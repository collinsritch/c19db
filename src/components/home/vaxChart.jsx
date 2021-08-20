import React, {useEffect, useState } from 'react';
import '../../styles/casesChart.css';
import axios from 'axios';
import {
  AreaChart,
//   ReferenceDot,
//   ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer
} from "recharts";
import dateFormat from 'dateformat'




const VaxChart = () => {
    const [vaxData,setVaxData] = useState({});

    const numFormatter = new Intl.NumberFormat('en-US')

    useEffect(() => {
        try{
            async function getData() {
                const response = await axios.get('https://ph-c19db.herokuapp.com/vaccinations')
                // console.log(response.data.data)

                setVaxData(response.data.data)
            }
            getData()
        }catch (e){
            console.log('Error on fetching data from vaccinations route', e)
        }
    }, []);
    console.log(vaxData);

    /**
        Make a funciton that transfroms vax data into recharts format
        const daily = [
            "Date" : date,
            "Vaccination Count": vaxcount
        ]
    */

    var daily = []
    
    function transformVaxData(){
        let a;
        for(a in vaxData.graphData){
            if(vaxData.graphData[a].total_vaccinations !== 0){
                daily.push(
                    {
                        "date":dateFormat(vaxData.graphData[a].case_date,"mediumDate"),
                        "Vaccination Count": vaxData.graphData[a].total_vaccinations
                    }
                )
            }
        }
    }

    transformVaxData()

    console.log(daily)


    return(
        <div className= "main-chart" id="vax-chart">
            <ResponsiveContainer width="100%" length="100%">
                <AreaChart
                width={1150}
                height={340}
                data={daily}
                margin={{
                top: 30,
                right: 30,
                left: 30,
                bottom: 30,
                }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="rgba(255,195,113,1)" stopOpacity={0.8}/>
                            <stop offset="98%" stopColor="rgba(255,195,113,1)" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                       
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date"  tick = {{fontSize: 11}}/>
                    <YAxis type="number" interval = "preserveStartEnd" tickFormatter={tick => numFormatter.format(tick)} />
                    <Tooltip formatter={value => numFormatter.format(value)} />
                    <Area type="monotone" dataKey="Vaccination Count" stroke="rgba(255,195,113,1)" fillOpacity={1} fill="url(#colorUv)" />
                    <Legend />
        
                        
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}

export default VaxChart;