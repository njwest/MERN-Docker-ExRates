import React from 'react';

export const ExchangeTable = (props) => {
  return (
    <table className={props.extraClass
      ? "table is-hoverable is-fullwidth is-striped " + props.extraClass
      : "table is-hoverable is-fullwidth is-striped"}>
      <thead>
        {props.bidAsk
          ? <tr>
              <th>
                <abbr title="Currency Pair">Pair</abbr>
              </th>
              <th>Bid</th>
              <th>Ask</th>
            </tr>
          : <tr>
            <th>
              <abbr title="Currency Pair">Pair</abbr>
            </th>
            <th>Rate</th>
          </tr>
        }

      </thead>
      <tbody>
        {props.children}
      </tbody>
    </table>
  )
}
