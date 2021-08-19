import React from 'react';
import '../styles/navigationBar.css'

function NavigationBar() {
    return(
        <div className = "navbar-container">

            <div className = "logo-and-title">
                <div className = "dummy-logo"></div>
                COVID-19 Health Data Dashboard
            </div>

            <div className = "link-div">
                <a id="home-link" href = "/"> Home </a>
                <a id = "about-link" href = "/info"> Information </a>
            </div>
        </div>
    );
}

export default NavigationBar;