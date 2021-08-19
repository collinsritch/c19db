import React, { useEffect,useState } from 'react';
import axios from 'axios'

function CaseDataBox(obj){   
    const [counts, setCounts] = useState({});
    

    useEffect(() => {
        try{
            let homeData;

            async function getData () {
                const response = await axios.get('http://localhost:5000/home')
                homeData = response.data.data

                console.log(homeData)   
                setCounts(homeData.counts)
            }

            getData()

        }catch(e){
            console.error(e)
        }
    },[])

    // const getData = async () => {
    //     const response = await axios.get('http://localhost:5000/home')
    //     homeData = response.data.data

    //     // console.log(homeData)   
    //     setCounts(homeData.counts)
    //     // console.log(counts)
    // }

    const type2style = {
        // background: "rgb(255,95,109)",
        background: "linear-gradient(225deg, rgba(255,95,109,1) 27%, rgba(255,195,113,1) 100%)",
    };

    const type3style ={
        background: "linear-gradient(225deg, rgba(97,183,142,1) 27%, rgba(178,232,124,1) 100%)",
    }

    const type4style = {
        background: "linear-gradient(225deg, rgba(255,153,0,1) 27%, rgba(251,228,145,1) 100%)"
    }

    const type5style = {
        background: "linear-gradient(225deg, rgba(29,38,113,1) 27%, rgba(195,55,100,1) 100%)"
    }

    const numFormatter = new Intl.NumberFormat('en-US')
    // console.log(numFormatter.format(givenNumber))

    
    

    // console.log(counts)

    return(
        <>
            <div className = "data-container-ov">
                <h1 className="data-val">{numFormatter.format(counts.newCaseCount)} </h1> 
                {/* <h1 className="data-val">0</h1>  */}
                <h2 className="data-label">New Cases</h2>
            </div>

            <div className = "data-container-ov" style = {type2style}>
                <h1 className="data-val">{numFormatter.format(counts.totalCaseCount)}</h1>
                {/* <h1 className="data-val">0</h1> */}
                <h2 className="data-label">Total Cases</h2>
            </div>

            <div className = "data-container-ov" style = {type3style}>
                <h1 className="data-val">{numFormatter.format(counts.recoveryCount)}</h1>
                {/* <h1 className="data-val">0</h1> */}
                <h2 className="data-label">Total Recoveries</h2>
            </div>

            <div className = "data-container-ov" style={type4style}>
                <h1 className="data-val">{numFormatter.format(counts.activeCaseCount)}</h1>
                {/* <h1 className="data-val">0</h1> */}
                <h2 className="data-label">Total Active Cases</h2>
            </div>

            <div className = "data-container-ov" style={type5style}>
                <h1 className="data-val">{numFormatter.format(counts.deathCount)}</h1>
                {/* <h1 className="data-val">0</h1> */}
                <h2 className="data-label">Deaths</h2>
            </div>
        </>
    );
}

export default CaseDataBox;