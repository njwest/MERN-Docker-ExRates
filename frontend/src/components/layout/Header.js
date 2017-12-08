import React, { Fragment } from 'react';
import { NavBar } from './NavBar';
import GithubCorner from 'react-github-corner';

export const Header = (props) => {
  return (
    <Fragment>
      <GithubCorner href={props.githubURL} target="_blank" rel="noopener noreferrer" ariaLabel="Open this project on GitHub" octoColor="2B9EEB" className="headerOctoCat" />
      <div className="hero-head">
        <NavBar />
      </div>
    </Fragment>
  )
}
