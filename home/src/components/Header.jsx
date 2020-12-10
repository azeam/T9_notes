import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render(){
        return(
            <div>
                <h1 className={this.props.className}>{this.props.label}</h1>
            </div>
        );
    }
}

export default (Header);