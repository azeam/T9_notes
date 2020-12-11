import React, { Component, useState, useRef } from 'react';
import Hamburger from "./Hamburgerbutton";
import NewNote from './Button';
import Burger from './BurgMenu';
import HamMenu from './HamMenu';
import './Sidebar.css';

function Sidebar() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";


  return (
      <>
        <div ref={node}>
            <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
            <HamMenu open={open} setOpen={setOpen} id={menuId} />
        </div>
        
      </>
  );
}

export default (Sidebar);

// class Sidebar extends Component {
//     shoeSettings (event) {
//         event.preventDefault();
//     }
    
//     // TODO: set old data to null and clear text/category areas when clicking New Note
//     render(){
//         return(
//             <div className="sidebar">
//                 <Menu noOverlay="true">
//                 <NewNote label="New note"></NewNote>
//                 <Hamburger getAllNotes={this.props.getAllNotes} notes={this.props.notes} getSingleNote={this.props.getSingleNote}></Hamburger>
//                 <Burger></Burger>
//                 <HamMenu></HamMenu>
//                 </Menu>
//             </div>
//         );
//     }
// }

// export default (Sidebar);