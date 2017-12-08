import React, { Component, Fragment } from 'react';
import moment from 'moment';
import { ExchangeTable, Row, Title } from './common'

import io from 'socket.io-client';
const socket = io('http://128.199.130.212:6200')

export default class RealtimeRates extends Component {
  constructor() {
    super();
    this.state = {
      pair: null,
      ask: null,
      bid: null,
      time: null
    };
  }

  componentDidMount() {
    socket.on('rate stream', data => {
      this.setState({
        pair: data.pair,
        ask: data.last.askprice,
        bid: data.last.bidprice,
        time: data.last.timestamp
      });
    });
  }

  shouldComponentUpdate(nextProps, nextState){
    return this.state.time !== nextState.time;
  }

  componentDidUpdate(){
    console.log('New rate received');
  }

  componentWillUnmount() {
    socket.removeListener('rate stream');
  }

  render() {
    const { pair, ask, bid, time } = this.state;
    let dateTime = new Date(time);
    let formattedTime = moment(dateTime).format('h:mm:ss a on D/M/YYYY');

    return (
      <div className="container has-text-centered">
        {
          pair ?
            <Fragment>
              <Title title="Realtime Rates via Socket.io" subTitle={"Last updated at " + formattedTime}/>
              <ExchangeTable bidAsk={true} extraClass="slideUpOver100">
                <Row
                  pair={ pair }
                  ask={ ask }
                  bid={ bid }
                />
              </ExchangeTable>
            </Fragment>
          : <p className="loading">Listening</p>
        }
      </div>
    );
  }
}
