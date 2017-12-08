const express = require('express');
const router = express.Router();
const axios = require('axios');

const CurrencyRate = require('../schemas/CurrencyRate.js');
const Currency = require('../schemas/Currency.js');

const OER_KEY = process.env.OER_SECRET;

// Get all rates from the OpenExchangeRates API
router.route('/allrates').get((req, res) => {
  axios.get('https://openexchangerates.org/api/latest.json?app_id=' + OER_KEY).then((response) => {
    res.send(response.data);
    saveRates(response.data);
  }).catch(function(error) {
    // If API is unavailable, retrieve latest conversion rates record from database
    console.log(error + '\n $$ Remote API unavailable, attempting to retrieve conversion rates from local database... $$');

    CurrencyRate.findOne({}, {}, {
      sort: {
        $natural: -1
      }
    }, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        res.json(item);
      }
    });
  });
});

// Check to see if the conversion rates are newer than our database's latest record of them
// If rates are newer, save them to MongoDB and print a message.
let saveRates = (data) => {
  CurrencyRate.findOne({}, {}, {
    sort: {
      $natural: -1
    }
  }, (err, record) => {
    if (err) {
      console.log(err);
    } else if (!record || record.timestamp !== data.timestamp) {
      let item = new CurrencyRate(data);
      item.save();
      console.log('$$ New conversion rates saved to database $$');
    } else {
      console.log('$$ Skipping conversion rate save, timestamps equivalent $$')
    }
  });
}

// Get all currency {"acronym": "full name"} pairs
router.route('/currencies').get((req, res) => {
  axios.get('https://openexchangerates.org/api/currencies.json?app_id=' + OER_KEY).then((response) => {
    res.send(response.data);
    saveCurrencies(response);
  }).catch((error) => {
    // If API is unavailable, retrieve latest conversion rates record from database
    console.log(error + '\n $$ Remote API unavailable, attempting to retrieve currency list from local database... $$');

    Currency.findOne({}, {}, {
      sort: {
        $natural: -1
      }
    }, (err, item) => {
      if (err) {
        console.log(err);
      } else {
        res.json(item);
      }
    });
  });
});

let saveCurrencies = (response) => {
  Currency.findOne({}, {}, {
    sort: {
      $natural: -1
    }
  }, (err, record) => {
    if (err) {
      console.log(err);
    } else if (!record || Object.keys(record.data).length !== Object.keys(response.data).length) {
      let item = new Currency(response);
      item.save();
      console.log('$$ New currency list saved to database $$');
    } else {
      console.log('$$ Skipping currency list save, list lengths equivalent $$')
    }
  });
}

// Get historic currency rates for any day since 1999 from the European Central Bank
router.route('/historic/:base/:date').get((req, res) => {
  axios.get('https://api.fixer.io/' + req.params.date + '?base=' + req.params.base).then((response) => {
    res.send(response.data);
  }).catch(function(error) {
    console.log(error);
  })
});

module.exports = router;
