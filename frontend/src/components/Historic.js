import React, {Component} from 'react';
import ExRateService from '../services/ExRateService';
import { Option, ExchangeTable, Row, Title } from './common';

export default class Historic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      day: '',
      month: '',
      year: '',
      base: '',
      rates: '',
      loaded: false
    };
    this.exRateService = new ExRateService();
    this.changeDay = this.changeDay.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.changeYear = this.changeYear.bind(this);
    this.changeBase = this.changeBase.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    let { year, month, day, loaded, base } = this.state;

    return nextState.year !== year || nextState.month !== month || nextState.day !== day || nextState.base !== base || !loaded;
  }

  componentDidUpdate() {
    let { year, month, day, loaded, base } = this.state;

    if(!loaded && day && month && year && base){
        this.getHistoricRates();
      }
      // console.log(this.state);
  }

  getHistoricRates() {
    let { base, year, month, day } = this.state;
    let date = year + '-' + month + '-' + day;

    this.exRateService.historicRates(date, base, (data) => {
      this.setState({
        base: data.base,
        rates: data.rates,
        loaded: true
      });
    });
  }

  renderRows() {
    let { base, rates } = this.state;

    return Object.keys(rates).map(function(key, keyIndex){
      return (
        <Row
          pair={base + '/' + key}
          ask={rates[key] + ' ' + key + ' = 1 ' + base}
          key={keyIndex}
        />
      )
    });
  }

  changeDay(e) {
    this.setState({
      day: e.target.value,
      loaded: false
    });
  }

  changeMonth(e) {
    this.setState({
      month: e.target.value,
      loaded: false
    });
  }

  changeYear(e) {
    this.setState({
      year: e.target.value,
      loaded: false
    });
  }

  changeBase(e) {
    this.setState({
      base: e.target.value,
      loaded: false
    });
  }

  renderYears() {
    const years = ['1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017'];

    return years.map(year => {
      return <Option val={year} key={year} />
    })
  }

  renderMonths() {
    const months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

    return months.map(month => {
      return <Option val={month} key={month} />
    });
  }

  renderDays() {
    let { year, month } = this.state;

    const leapYears = ['2000', '2004', '2008', '2012', '2016'],
          thirtyDays = ['04', '06', '09', '11'];
    let days = [];
    // Get current month and day
    let now = new Date();
    let currentYear = now.getFullYear().toString(),
        currentMonth = (now.getMonth() + 1),
        currentDay = now.getDate();

    if(currentMonth < 10){
      currentMonth = '0' + currentMonth.toString();
      console.log(currentMonth);
    } else {
      currentMonth.toString();
    }
    // Start conditionally generating days available for the selected month
    // eslint-disable-next-line
    if(year == currentYear && month == currentMonth){
      for(let i = 1; i <= currentDay; i++){
        days.push(
          <Option val={i < 10 ? '0' + i : i} key={i}/>
        );
      }
    } else if(month === '02'){
      let febLength;
      leapYears.includes(year) ? febLength = 29 : febLength = 28;

      for(let i = 1; i <= febLength; i++){
        days.push(
          <Option val={i < 10 ? '0' + i : i} key={i}/>
        );
      }
    } else if(thirtyDays.includes(month)){
      for(let i = 1; i <= 30; i++){
        days.push(
          <Option val={i < 10 ? '0' + i : i} key={i}/>
        );
      }
    } else {
        let i;
        // NOTE First available day in Fixer API's exrate history is 1999-01-04
        for(year === '1999' ? i = 4 : i = 1; i <= 31; i++){
          days.push(
            <Option val={i < 10 ? '0' + i : i} key={i}/>
          );
        }
    }
    return (
      <select onChange={this.changeDay} value={this.state.day}>
        <option></option>
        {days}
      </select>
    );
  }

    renderCurrencies() {
      const currencies = ['AUD','CAD','CHF','CYP','CZK','DKK','EEK','EUR','GBP','HKD','HUF','ISK','JPY','KRW','LTL','LVL','MTL','NOK','NZD','PLN','ROL','SEK','SGD','SIT','SKK','TRL','USD','ZAR'];

      return currencies.map(currency => {
        return <Option val={currency} key={currency} />
      });
    }


  render() {
    return (
      <div className="container">
          <Title
            title="Search for Exchange Rates by Date"
            subTitle="Rates Available from January 4, 1999 to Today"
          />
          <form id="historicForm">
              <div className="field has-addons is-grouped is-grouped-centered">
                <div className="control">
                  <div className="select">
                    <select onChange={this.changeYear} value={this.state.year}>
                      <option></option>
                      {this.renderYears()}
                    </select>
                  </div>
                  <label htmlFor="year" className="label">Year</label>
                </div>
              {this.state.year &&
                <div className="control slideIn">
                  <div className="select">
                    <select onChange={this.changeMonth} value={this.state.month}>
                      <option></option>
                      {this.renderMonths()}
                    </select>
                  </div>
                  <label htmlFor="month" className="label">Month</label>
                </div>
              }
              {this.state.month &&
                <div className="control slideIn">
                  <div className="select">
                    {this.renderDays()}
                  </div>
                  <label htmlFor="day" className="label">Day</label>
                </div>
              }
            </div>
            {this.state.day &&
              <div id="baseSelect" className="control slideDown centered">
                <div className="select">
                  <select
                    onChange={this.changeBase}
                    value={this.state.base}
                    >
                    <option></option>
                    {this.renderCurrencies()}
                  </select>
                  <label htmlFor="base" className="label">Base</label>
                </div>
              </div>
            }
          </form>
          {
            this.state.loaded &&
            <ExchangeTable
              extraClass="slideUp"
              >
              {this.renderRows()}
            </ExchangeTable>
          }
      </div>
    )
  }
}
