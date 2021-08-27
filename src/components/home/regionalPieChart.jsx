import React, {PureComponent,useState, useEffect} from 'react'
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';



const RegionalPieChart = (props) => {

  const numFormatter = new Intl.NumberFormat('en-US')

  return(
      <PieChart width={200} height={200}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={props.data}
          cx="50%"
          cy="50%"
          outerRadius={90}
          fill={props.chartColor}

        />
        <Tooltip formatter={value => numFormatter.format(value)} />
      </PieChart>
  )
}
  

export default RegionalPieChart

