import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { Header, Footer } from './components/layout';
import Converter from './components/Converter';
import Historic from './components/Historic';
import RealtimeRates from './components/RealtimeRates';

class App extends Component {

  render() {
    const githubURL = 'https://github.com/njwest/MERN-Docker-ExRates';

    return (
      <Router>
        <section className="hero is-info is-fullheight">
          <Header githubURL={githubURL}/>
            <div className="hero-body">
              <Route exact path="/" component={Converter}/>
              <Route path="/historic" component={Historic} />
              <Route path="/realtime-rates" component={RealtimeRates} />
            </div>
          <Footer githubURL={githubURL}/>
        </section>
      </Router>
    );
  }
}

export default App;
