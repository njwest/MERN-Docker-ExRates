import React from 'react';
// Example usage: <Option val="02" display="optionalField" />
export const Option = (props) => {
  return (
    <option value={props.val}>
      {props.display ? props.display : props.val}
    </option>
  )
}
