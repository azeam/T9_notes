import React, { Component } from 'react';
import {scaleDown as Menu} from 'react-burger-menu';
import Hamburger from "./Hamburgerbutton";
import NewNote from './Button';
import './Sidebar.css';

class Sidebar extends Component {
    shoeSettings (event) {
        event.preventDefault();
	}
	
    render(){
        return(
            <div className="sidebar">
                <Menu noOverlay="true">
                <NewNote label="New note"></NewNote>
                <Hamburger></Hamburger>
                </Menu>
            </div>
        );
    }
}

export default (Sidebar);