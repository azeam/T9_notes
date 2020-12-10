import React, { Component } from 'react';
import {scaleDown as Menu} from 'react-burger-menu';
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
                    <NewNote label="New Note"></NewNote>
                    <a>test</a>
                    <a>test</a>
                    <a>test</a>
                    <a>test</a>
                </Menu>
            </div>
        );
    }
}

export default (Sidebar);