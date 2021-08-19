import React from 'react';
import RegionalLineChart from './regionalLineChart';
import dateFormat from 'dateformat';


const RegionalTable = ({ data }) => {

    // console.log("Regional Table data")
    // console.log(data)

    const regionName = {
        'NCR': ['NCR', 'National Capital Region'],
        'CAR': ['CAR', 'Cordillera Administrative Region'],
        'R1': ['Region I', 'Ilocos Region'],
        'R2': ['Region II', 'Cagayan Valley'],
        'R3': ['Region III', 'Central Luzon'],
        'R4a': ['Region IV-A', 'Calabarzon'],
        'R4b': ['Region IV-B', 'Mimaropa'],
        'R5': ['Region V', 'Bicol Region'],
        'R6': ['Region VI', 'Western Visayas'],
        'R7': ['Region VII', 'Central Visayas'],
        'R8': ['Region VIII', 'Eastern Visayas'],
        'R9': ['Region IX', 'Zamboanga Peninsula'],
        'R10': ['Region X', 'Northern Mindanao'],
        'R11': ['Region XI', 'Davao Region'],
        'R12': ['Region XII', 'Soccsksargen'],
        'CARAGA': ['Region XIII', 'Caraga'],
        'BARMM': ['BARMM', 'Bangsamoro'],
        'ROF': ['ROF', 'Returning Overseas Filipinos'],
    }

    const regions = Object.keys(regionName)

    function reformatDates() {
        data.forEach((item) => {
            item.Date = dateFormat(item.Date, 'mediumDate')
        })
    }
    reformatDates()

    return (
        <div className="regional-table-container">
            <table>
                <colgroup>
                    <col span="1" style={{ width: "20%" }} />
                    <col span="1" style={{ width: "80%" }} />
                </colgroup>
                <thead>
                    <tr>
                        <th><h3>Region</h3></th>
                        <th><h3>Timeline of Cases</h3></th>
                    </tr>
                </thead>
                <tbody>
                    {regions.map(region => {
                        return (
                            <tr className='nene'>
                                <td>
                                    <p><b>{regionName[region][0]}</b></p>
                                    <p>{regionName[region][1]}</p>
                                </td>
                                <td>
                                    <RegionalLineChart data={{ daily: data, region: region }} />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default RegionalTable