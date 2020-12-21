import React, { useState, useRef } from 'react';
import { useOnClickOutside } from './SidebarHook'; 
import Burger from './BurgMenu';
import HamMenu from './HamMenu';
import './Sidebar.css';

// function that is the Sidebar on page NoteForm
// it is a function and not a class due to the use of react hook's
function Sidebar(props) {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  // method that closes the sidebar when user pressed outside of the sidebar
  useOnClickOutside(node, () => setOpen(false));

  return (
      <>
        <div ref={node}>
            <Burger notes={props.notes} handleSingleNote={props.handleSingleNote} newNote={props.newNote} open={open} setOpen={setOpen} aria-controls={menuId} />
            <HamMenu open={open} setOpen={setOpen} id={menuId} />
        </div>
      </>
  );
}

export default (Sidebar);