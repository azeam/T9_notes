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
            <Burger notes={props.notes} handleSingleNote={props.handleSingleNote} newNote={props.newNote} open={open} setOpen={setOpen} aria-controls={menuId} />
            <HamMenu open={open} setOpen={setOpen} id={menuId} />
        </div>
      </>
  );
}

  export default (Sidebar);

// class Sidebar extends Component {
//     shoeSettings (event) {
//         event.preventDefault();
// 	}
    
//     // TODO: set old data to null and clear text/category areas when clicking New Note
//     render(){
//         return(
//             <div className="sidebar">
//                 <Menu noOverlay="true">
//                 <NewNote label="New note"></NewNote>
//                 <Hamburger notes={this.props.notes} getSingleNote={this.props.getSingleNote}></Hamburger>
//                 </Menu>
//             </div>
//         );
//     }
// }

// export default (Sidebar);

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