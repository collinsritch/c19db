import React from "react";

 

function CasesChartData(props) {

    // console.log(caseData)
    return(
        <div className = "right-data-container">
            <h2>Date</h2>

            <h2>New Cases:</h2>
            <p>0</p>

            <h2>Recoveries:</h2>
            <p>0</p>

            <h2>Deaths:</h2>
            <p>0</p>

            <h2>Cumulative total up to this date:</h2>
            <p>0</p>
        </div>
    );
}

export default CasesChartData