import React from 'react';
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
// import dateFormat from 'dateformat';

const RegionalLineChart = ({ data }) => {

    const numFormatter = new Intl.NumberFormat('en-US')

    const daily = data.daily
    const region = data.region

    return (

        <div className="regional-line-chart-container">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    width={400}
                    height={300}
                    data={daily}
                    margin={{
                        top: 7,
                        right: 30,
                        left: 20,
                        bottom: 7,
                    }}
                >
                    <CartesianGrid
                        strokeDasharray="3 3" />
                    <XAxis
                        dataKey="Date"
                        tick={{ fontSize: 11 }}
                        /* tickFormatter={tick => dateFormat(tick, "mediumDate")} */ />
                    <YAxis
                        tick={{ fontSize: 11 }}
                        tickFormatter={tick => numFormatter.format(tick)} />
                    <Tooltip
                        formatter={value => numFormatter.format(value)}
                        /* labelFormatter={label => dateFormat(label, "mediumDate")} */ />
                    <Line
                        dataKey={region}
                        name={region + " cases"}
                        stroke="rgba(33,147,176,1)"
                        dot={{ r: 0 }}
                        activeDot={{ r: 4 }} />
                    <Legend />
                </LineChart>
            </ResponsiveContainer>
        </div>

    )
}

export default RegionalLineChart