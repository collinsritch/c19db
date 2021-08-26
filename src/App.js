import React from 'react';
import './App.css';

import {
  BrowserRouter,
  Switch,
  Route,
//   Redirect,
//   useParams
} from "react-router-dom";


import NavigationBar from './components/navigationBar'
import Home from './components/home/homepage'
import Vaccinations from './components/vaccinations/vaccinations';
import Regional from './components/regional/regional'
import NewsPage from './components/news/news';
import Footer from './components/footer'
import InfoPage from './components/informationPage/infoPage'

function App() {
  return (
    <div>
        <BrowserRouter>
          <NavigationBar/>
            <Switch>
              <Route exact path="/" component={Home}/>
                    {/* <Route path="*" render={() => <Redirect to="/" />} /> */}
              <Route exact path="/vaccinations" component={Vaccinations}/>
              <Route exact path="/regional" component={Regional}/>
              <Route exact path="/news" component={NewsPage}/>
              <Route exact path="/info" component={InfoPage}/>

            </Switch>
        
        </BrowserRouter>
    </div>
  );
}

export default App;
