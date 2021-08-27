import axios from 'axios'
import React, { useMemo } from 'react'
import '../../styles/news.css'
import DateFnsUtils from '@date-io/date-fns'
import WeeklyCaseChart from './weeklyCaseChart'
import Grid from '@material-ui/core/Grid';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { useState } from 'react'
import NewsCard from './newsCard'
import Pagination from './pagination'
import newsList from './newsList'

let PageSize = 5

const NewsPage = (props) => {
    // News and date data variables
    const [dateInput, setDateInput] = useState(Date.now())
    const [selectedNews, setSelectedNews] = useState([])

    // Pagination-related variables
    const [currentPage, setCurrentPage] = useState(1)
    
    const currentNewsData = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize
        const lastPageIndex = firstPageIndex + PageSize
        return selectedNews.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, selectedNews])

    // // This will convert the output date from the date picker to 'YYYY-MM-DD'
    function convertDateFormat(str) {
        var date = new Date(str),
          mnth = ("0" + (date.getMonth() + 1)).slice(-2),
          day = ("0" + date.getDate()).slice(-2);
        return [date.getFullYear(), mnth, day].join("-");
    }

    // // Changes the state of the input date when user picks a date from the date picked
    const handleDateChange = (date) => {
        setDateInput(date)
    }

    // // Call convertDateFormat and also gets the list of news from the server
    const handleButtonClick = () => {
        const newDate = convertDateFormat(dateInput)
        getNews(newDate)
    }

    // // This is where the GET request happens
    const getNews = async (date) => {
        // const response = await axios.get(`http://localhost:5000/news/${date}`)
        if(newsList[date] === undefined) {
            setSelectedNews([])
        }
        else {
            setSelectedNews(newsList[date])
        }
       
        console.log(selectedNews)
    }

    return (
        <div className="newsContainer">
            <div className="main-heading-container">
                <h1>Timeline And Events</h1>
                <h3>See the latest updates of Covid-19 in the Philippines</h3>
            </div>
            
            <WeeklyCaseChart/>
            <div className="news-container">
                <h1>Get Latest Events</h1>
                <div className="date-input-container">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={dateInput}
                            onChange={handleDateChange}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <button onClick={handleButtonClick}>Show Events</button>
                </div>

                <div className="articles-container">

                    { (selectedNews.length == 0 || selectedNews == undefined) && 
                        <h2> No COVID-19 related news added in this date yet</h2>
                    }

                    
                    { selectedNews.length > 0 && currentNewsData.map((article) => {
                        const {news_title, news_link, news_source} = article
                        return <NewsCard key={news_title} title={news_title} link={news_link} source={news_source} />
                        })
                    }
                    
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={selectedNews.length}
                        pageSize={PageSize}
                        onPageChange={page => setCurrentPage(page)}
                    />
                </div>
            </div>
        </div>
    )
}

export default NewsPage