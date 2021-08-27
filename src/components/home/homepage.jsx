import React from 'react';
// import Switch from "react-switch
import OverviewContainer from './overviewContainer';
import CasesChart from "./caseChart";
import Information from './information';
import VaxChart from './vaxChart';
import RegionalOverview from './regionalOverview';
import '../../styles/casesChart.css';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import caseDataRaw from './caseDataRaw';


function Home() {

    const data = caseDataRaw

    return (
        <>
            <div className="home-main-div">
                <OverviewContainer data = {data} />

                <div className="chart-div">
                    {/* <div className="week-day-switch">
                    Daily &nbsp; 
                    <Switch
                        offColor="#2193B0"
                        onColor="#6DD5ED"
                        uncheckedIcon={false}
                        checkedIcon={false}
                        checked={false}
                        disabled
                        onChange={onChange()}
                    /> &nbsp; Weekly  &nbsp;
                </div> */}
                    <CasesChart data = {data} />
                    {/* <CasesChartData/> */}
                </div>

                <div className="vax-page-link">
                    <a id="vax-link-a" href="/news">
                        <h3>Timeline And Events</h3>
                        <KeyboardArrowRightIcon />
                    </a>
                </div>

                <h2 id="vax-header" style={{ marginLeft: "7.8%", marginBottom: "1rem", marginTop: "2rem" }}>Vaccination Data Overview</h2>
                <div className="chart-div" id="vax-chart-div">
                    <VaxChart />
                </div>

                <div className="vax-page-link">
                    <a id="vax-link-a" href="/vaccinations">
                        <h3>Vaccination Statistics</h3>
                        <KeyboardArrowRightIcon />
                    </a>
                </div>

                <h2 id="vax-header" style={{ marginLeft: "7.8%", marginBottom: "1rem", marginTop: "2rem" }}>Regional Cases Overview</h2>
                <RegionalOverview />

                <div className="vax-page-link">
                    <a id="vax-link-a" href="/regional">
                        <h3>Regional Statistics And Analyses</h3>
                        <KeyboardArrowRightIcon />
                    </a>
                </div>

                <Information />

            </div>
        </>
    );
}

export default Home;