import React from 'react';
import { bool, func } from 'prop-types';
import { StyledBurger } from './HamMenu.Style';
import './HamMenu.css';

// the button that opens the BurgMenu "Sidebar"
const Burger = ({ open, setOpen, ...props }) => {
  
  const isExpanded = open ? true : false;
  
  return (
    <StyledBurger aria-label="Toggle menu" aria-expanded={isExpanded} open={open} onClick={() => setOpen(!open)} {...props}>
      <span/>
      <span id="span2"/>
      <span/>
    </StyledBurger>
  )
}

Burger.propTypes = {
  open: bool.isRequired,
  setOpen: func.isRequired,
};

export default Burger;
