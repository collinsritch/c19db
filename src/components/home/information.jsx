import React from 'react'
import '../../styles/information.css'

const Information = () =>  {
    return (
        <div className="main-container">
            <div className="container container1">
                <h2 className="info-title">Prevention</h2>
                <div className="info-container">
                    <div className="info">
                        <div className="icon p-icon1"></div>
                        <h5>Wash your hands</h5>
                    </div>

                    <div className="info">
                        <div className="icon p-icon2">
                        </div>
                        <div><h5>Always use soap</h5></div>
                    </div>

                    <div className="info">
                        <div className="icon p-icon3"></div>
                        <div><h5>Wear a mask</h5></div>
                    </div>
                </div>

                <div className="info-container">
                    <div className="info">
                        <div className="icon p-icon4"></div>
                        <h5>Disinfect</h5>
                    </div>

                    <div className="info">
                        <div className="icon p-icon5"></div>
                        <h5>Avoid physical contact</h5>
                    </div>
                    
                    <div className="info">
                        <div className="icon p-icon6"></div>
                        <h5>Avoid a crowd</h5>
                    </div>
                </div>
            </div>

            <div className="container container2">
                <h2 className="info-title">Symptoms</h2>
                <div className="info-container">
                    <div className="info">
                        <div className="icon s-icon1"></div>
                        <h5>Fever</h5>
                    </div>

                    <div className="info">
                        <div className="icon s-icon2"></div>
                        <h5>Sore Throat</h5>
                    </div>

                    <div className="info">
                        <div className="icon s-icon3"></div>
                        <h5>Runny Nose</h5>
                    </div>
                </div>

                <div className="info-container">
                    <div className="info">
                        <div className="icon s-icon4"></div>
                        <h5>Fatigue</h5>
                    </div>

                    <div className="info">
                        <div className="icon s-icon5"></div>
                        <h5>Difficulty Breathing</h5>
                    </div>

                    <div className="info">
                        <div className="icon s-icon6"></div>
                        <h5>Cough</h5>
                    </div>
                </div>
            </div>

            <div className="container container3">
                <h2 className="info-title">How to dispose your mask</h2>
                <div className="info-container">
                    <div className="info">
                        <div className="icon m-icon1"></div>
                        <div><h5>Take off your mask</h5></div>
                    </div>

                    <div className="info">
                        <div className="icon m-icon2"></div>
                       <div><h5>Fold used mask into half</h5></div>
                    </div>

                    <div className="info">
                        <div className="icon m-icon3"></div>
                        <div><h5>Fold again like a roll</h5></div>
                    </div>
                </div>

                <div className="info-container">
                    <div className="info">
                        <div className="icon m-icon4"></div>
                        <div><h5>Put the mask into plastic/paper bag</h5></div>
                    </div>

                    <div className="info">
                        <div className="icon m-icon5"></div>
                        <div><h5>Dispose mask into a bin</h5></div>
                    </div>

                    <div className="info">
                        <div className="icon m-icon6"></div>
                        <div><h5>Wash hands after disposing</h5></div>
                    </div>
                </div>
            </div>
            


        </div>
    )
}

export default Information

