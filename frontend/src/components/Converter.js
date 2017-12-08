import React, { Component } from 'react';
import ExRateService from '../services/ExRateService';
import { Option, Title } from './common';

export default class Converter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencies: [],
      allRates: {},
      value: 1,
      valueTwo: 1,
      baseCurrency: '',
      targetCurrency: ''
    };
    this.exRateService = new ExRateService();
    this.valueChange = this.valueChange.bind(this);
    this.valueTwoChange = this.valueTwoChange.bind(this);
    this.convert = this.convert.bind(this);
    this.baseCurrencyChange = this.baseCurrencyChange.bind(this);
    this.targetCurrencyChange = this.targetCurrencyChange.bind(this);
    this.switchCurrencies = this.switchCurrencies.bind(this);
  }

  componentDidMount() {
    this.getCurrencies();
    this.getRates();
  }

  componentDidUpdate() {
    let { baseCurrency, targetCurrency, value } = this.state;
    console.log('State Updated \n Value: ' + value + ' Base Currency: ' + baseCurrency + ' Target Currency: ' + targetCurrency);
  }

  getCurrencies() {
    this.exRateService.allCurrencies((currencies) => {
      // alphabetize the currency {object} by name in an [array] first
      let currencyArray = [];
      for (let name in currencies){
        currencyArray.push([currencies[name], name]);
      }
      let alphabetized = currencyArray.sort();
      // set the alphabetized array to state
      this.setState({currencies: alphabetized});
    })
  }

  getRates() {
    this.exRateService.allRates((data) => {
      this.setState({allRates: data.rates});
    })
  }

  renderCurrencies() {
    let { allRates, currencies } = this.state;

    if (allRates && currencies) {
      return currencies.map(function(pair, intex) {
        return <Option val={pair[1]} display={pair[0]} key={pair[1]}/>
      })
    }
  }

  async valueChange(e) {
    try {
      await this.setState({value: e.target.value});
      this.convert();
    } catch (error) {
      console.log(error);
    }
  }

  async valueTwoChange(e) {
    try {
      await this.setState({valueTwo: e.target.value});
      this.convertUpstream();
    } catch (error) {
      console.log(error);
    }
  }

  async baseCurrencyChange(e) {
    try {
      await this.setState({baseCurrency: e.target.value});
      this.convert();
    } catch (error) {
      console.log(error);
    }
  }

  async targetCurrencyChange(e) {
    try {
      await this.setState({targetCurrency: e.target.value});
      this.convert();
    } catch (error) {
      console.log(error);
    }
  }

  // Swap the selected currencies from side to side
  async switchCurrencies() {
    let { baseCurrency, targetCurrency } = this.state;
    try {
      await this.setState({baseCurrency: targetCurrency, targetCurrency: baseCurrency});
      this.convert();
    } catch (error) {
      console.log(error);
    }
  }

// Since free access to the OpenExchange API only allows for retrieval of base US Dollar (USD) currency rates,
//the convert() function below converts the base value into USD (value / USD[selected base currency rate]),
//then multiplies that USD value by the USD[target currency rate].

  convert() {
    let { baseCurrency, targetCurrency, value, allRates } = this.state;

    if (baseCurrency && targetCurrency) {
      let convertedVal = ((value / allRates[this.state.baseCurrency]) * allRates[targetCurrency]);
      this.setState({valueTwo: convertedVal});
    }

  }

// Convert the base currency value (left side) by entering a value in the target currency value field (right side)
  convertUpstream() {
    let { baseCurrency, targetCurrency, valueTwo, allRates } = this.state;

    if (baseCurrency && targetCurrency) {
      let convertedVal = ((valueTwo / allRates[targetCurrency]) * allRates[baseCurrency]);

      this.setState({value: convertedVal});
    }

  }

  render() {
    return (
      <div className="container">
        <Title title="Convert Currency" />
        <form>
          <div className="columns">
            <div className="field column has-addons is-two-fifths">
              <div className="control">
                <input className="input has-text-right" type="number" onChange={this.valueChange} value={this.state.value}/>
                <label htmlFor="conversion-value" className="label has-text-right">Amount</label>
              </div>
              <div className="control">
                <div className="select">
                  <select onChange={this.baseCurrencyChange} value={this.state.baseCurrency} className="currency-select">
                    <option>Select a Currency</option>
                    {this.renderCurrencies()}
                  </select>
                </div>
                <label htmlFor="baseCurrency" className="label has-text-right">Base Currency</label>
              </div>
            </div>

            <div className="column has-text-centered">
              <a className="button switch-button" onClick={this.switchCurrencies}>
                <i className="fa fa-exchange" aria-hidden="true"></i>
              </a>
            </div>

            <div className="field column has-addons is-two-fifths">
              <div className="control">
                <input className="input has-text-right" type="number" onChange={this.valueTwoChange} value={this.state.valueTwo}/>
                <label htmlFor="conversion-value" className="label has-text-right">Amount</label>
              </div>
              <div className="control">
                <div className="select">
                  <select onChange={this.targetCurrencyChange} value={this.state.targetCurrency} className="currency-select">
                    <option>Select a Currency</option>
                    {this.renderCurrencies()}
                  </select>
                </div>
                <label htmlFor="targetCurrency" className="label has-text-right">Target Currency</label>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
