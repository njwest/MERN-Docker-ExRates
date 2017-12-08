import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className="tabs is-boxed is-fullwidth">
      <div className="container has-text-weight-bold is-size-5">
        <ul>
          <li>
            <NavLink to="/historic" activeClassName="activeLink">
              Historic
            </NavLink>
          </li>
          <li>
            <NavLink exact to="/" activeClassName="activeLink">
              Converter
            </NavLink>
          </li>
          <li>
            <NavLink to="/realtime-rates" activeClassName="activeLink">
              Realtime Rates
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}
