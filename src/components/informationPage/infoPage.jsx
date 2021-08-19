import React from 'react'
import '../../styles/informationPage.css'

const InfoPage = () => {
    return(
        <div className = "info-page">
            <h1>Sources</h1>
            <div className = "data-info">
                <h2>Data</h2>
                <p>
                All COVID-19 Case and Health data are from the <a id="doh-data-drop" href = "https://drive.google.com/drive/folders/1ZPPcVU4M7T-dtRyUceb0pMAd8ickYf8o?usp=sharing">Department of Health Data Drop</a>.<br/><br/>

                Vaccination data and statistics are <a id="owid-vax-data" href="https://github.com/owid/covid-19-data/">from Our World in Data</a>. 

                <br/><br/>
                The developers of this website only count, summarize, and visualize the data downloaded from these websites. They do not change nor manipulate the raw data in any way.
                </p>
            </div>
        </div>
    );
}

export default InfoPage;