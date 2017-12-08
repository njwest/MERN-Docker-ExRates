import React from 'react';

export const Row = (props) => {
  return (
    <tr>
      <th>{props.pair}</th>
      <td>{props.ask}</td>
      <td>{props.bid}</td>
      <td>{props.time}</td>
    </tr>
  )
}
