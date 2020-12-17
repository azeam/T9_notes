import React, { useState, useRef } from 'react';
import { useOnClickOutside } from './SidebarHook'; 
import Burger from './BurgMenu';
import HamMenu from './HamMenu';
import './Sidebar.css';

function Sidebar(props) {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  useOnClickOutside(node, () => setOpen(false));

  return (
    <>
      <div ref={node}>
        <Burger notes={props.notes} getSingleNote={props.getSingleNote} newNote={props.newNote} open={open} setOpen={setOpen} aria-controls={menuId}/>
        <HamMenu open={open} setOpen={setOpen} id={menuId}/>
      </div>
    </>
  );
}

export default (Sidebar);