import React, { Component } from 'react';
import {scaleDown as Menu} from 'react-burger-menu';
import Hamburger from "./Hamburgerbutton";
import NewNote from './Button';
import './Sidebar.css';

class Sidebar extends Component {
    shoeSettings (event) {
        event.preventDefault();
	}
    
    // TODO: set old data to null and clear text/category areas when clicking New Note
    render(){
        return(
            <div className="sidebar">
                <Menu noOverlay="true">
                <NewNote label="New note"></NewNote>
                <Hamburger getAllNotes={this.props.getAllNotes} notes={this.props.notes} getSingleNote={this.props.getSingleNote}></Hamburger>
                </Menu>
            </div>
        );
    }
}

export default (Sidebar);