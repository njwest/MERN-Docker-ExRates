import React, { Fragment } from 'react';

// Example usage:
export const Title = (props) => {
  return (
    <Fragment>
      <h1 className="title has-text-centered">
        {props.title}
      </h1>
      {props.subTitle &&
      <h2 className="subtitle has-text-centered">
        {props.subTitle}
      </h2>
      }
    </Fragment>
  )
}
