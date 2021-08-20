import axios from 'axios'
import React, {useEffect} from 'react'
import { useState } from 'react'
import dateFormat from 'dateformat'
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  ResponsiveContainer
} from "recharts";
import '../../styles/vaccinations.css'

const Vaccinations = () => {
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

    var vaxChartData = []
    var dailyVax = []
    
    function transformVaxData(){
        let a;
        for(a in vaxData.tableData){
            if(vaxData.tableData[a].total_vaccinations !== 0 && vaxData.tableData[a].people_fully_vaccinated !== 0){
                vaxChartData.push(
                    {
                        "date":dateFormat(vaxData.tableData[a].case_date,"mediumDate"),
                        "At Least One Dose": vaxData.tableData[a].total_vaccinations,
                        "People Fully Vaccinated": vaxData.tableData[a].people_fully_vaccinated
                    }
                )
            }

            if(vaxData.tableData[a].daily_vaccinations !== 0){
                dailyVax.push(
                    {
                        "date":dateFormat(vaxData.tableData[a].case_date,"mediumDate"),
                        "Daily Vaccination": vaxData.tableData[a].daily_vaccinations
                    }
                )
            }
        }
    }

    transformVaxData()


    return (
        <div className="content">
            <section className="heading-chart-container">
                <div className="heading-container">
                    <h1>Philippines Vaccination Data</h1>
                    <h2>General overview as of <b>August 19, 2021</b></h2>
                    <br/>
                </div>

                <div className="chart-container">
                    {/* <VaxChart/> */}
                    <ResponsiveContainer width="100%" length="100%">
                        <AreaChart
                        // width={1150}
                        // height={340}
                        data={vaxChartData}
                        margin={{
                        top: 30,
                        right: 30,
                        left: 30,
                        bottom: 30,
                        }}>
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="rgba(255,195,113,1)" stopOpacity={0.8}/>
                                    <stop offset="98%" stopColor="rgba(255,195,113,1)" stopOpacity={0}/>
                                </linearGradient>

                                <linearGradient id="atLeastOne" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="rgba(255,95,109,1)" stopOpacity={0.8}/>
                                    <stop offset="98%" stopColor="rgba(255,95,109,1)" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date"  tick = {{fontSize: 11}}/>
                            <YAxis type="number" interval = "preserveStartEnd" tickFormatter={tick => numFormatter.format(tick)} />
                            <Tooltip formatter={value => numFormatter.format(value)} />
                            <Area type="monotone" dataKey="At Least One Dose" stroke="rgba(255,195,113,1)" fillOpacity={1} fill="url(#colorTotal)" />
                            <Area type="monotone" dataKey="People Fully Vaccinated" stroke="rgba(255,95,109,1)" fillOpacity={1} fill="url(#atLeastOne)" />
                            <Legend />
                
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                
                <h2 className="heading-title"><br/><br/>Daily Vaccinations Administered</h2>
                <div className="chart-container">
                    {/* <VaxChart/> */}
                    <ResponsiveContainer width="100%" length="100%">
                        <AreaChart
                        // width={1150}
                        // height={340}
                        data={dailyVax}
                        margin={{
                        top: 30,
                        right: 30,
                        left: 30,
                        bottom: 30,
                        }}>
                            <defs>
                                <linearGradient id="dailyVaxColor" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="rgba(97,183,142,1)" stopOpacity={0.8}/>
                                    <stop offset="98%" stopColor="rgba(97,183,142,1)" stopOpacity={0}/>
                                </linearGradient>

                            </defs>
                            
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date"  tick = {{fontSize: 11}}/>
                            <YAxis type="number" interval = "preserveStartEnd" tickFormatter={tick => numFormatter.format(tick)} />
                            <Tooltip formatter={value => numFormatter.format(value)} />
                            <Area type="monotone" dataKey="Daily Vaccination" stroke="rgba(97,183,142,1)" fillOpacity={1} fill="url(#dailyVaxColor)" />
                            <Legend />
                
                        </AreaChart>
                    </ResponsiveContainer>
                </div>

                <div className="text-info-container">
                    <div>
                        <h2 className="heading-title">Herd Immunity</h2>
                        <div className="herd-immunity-container">
                            <p>The average number of doses administered in the last 5 days is <b>580,043</b>.</p>
                            <p>At this rate, it will take about <b>5.5 months (January 2022)</b> to fully vaccinate 70% of the Filipino population and achieve Herd Immunity.</p>
                        </div>
                    </div>

                    <div>
                        <h2 className="heading-title">Vaccinations per Hundred</h2>
                        <div className="herd-immunity-container">
                            <p>The total number of people who are vaccinated is <b>23,199,187</b>.</p>
                            <p><b>10,705,190</b> of these are already fully vaccinated (have received complete doses of their vaccine).</p>

                            <p>This means, for every 100 people in the Philippines, about <b>21.17</b> are vaccinated and <b>9.77</b> are fully vaccinated.</p>
                        </div>
                    </div>
                
                </div>

                
            </section>
        </div>  
    )
}

export default Vaccinations