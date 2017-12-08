import React from 'react';

export const Footer = (props) => {
  return (
    <div className="hero-foot">
      <nav className="tabs is-centered">
        <div className="container">
          <a className="has-text-black footerOctoCat" href={props.githubURL} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-github fa-4x" aria-hidden="true"></i>
          </a>
        </div>
      </nav>
    </div>

  )
}
