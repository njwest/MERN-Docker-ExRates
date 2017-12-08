import axios from 'axios';

const PROTOCOL = "http";
const SERVER = "128.199.130.212:6200";

export default class ExRateService {

// Get the rates for every currency via the OpenExchangeRates API
  allRates(callback) {
    axios.get(PROTOCOL + '://'+ SERVER + '/api/allrates')
    .then((response) => {
      callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback({"error":"Data unavailable"});
    });
  }

// Get the {"acronym": "full name"} for every available currency
// via the OpenExchangeRates API
  allCurrencies(callback) {
    axios.get(PROTOCOL + '://' + SERVER + '/api/currencies')
    .then((response) => {
      callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback({"error":"Data unavailable"});
    });
  }

// Get the historic rates for every currency available via the Fixer.io API (European Central Bank)
  historicRates(date, base, callback) {
    axios.get(PROTOCOL + '://' + SERVER + '/api/historic/' + base + '/' + date)
    .then((response) => {
      callback(response.data);
    })
    .catch(function (error) {
      console.log(error);
      callback({"error":"Data unavailable"});
    })
  }

}
