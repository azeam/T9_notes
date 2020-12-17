import React, { Component } from 'react';
import './Header.css';
import './Fonts.css';

class Header extends Component {
    render(){
        return(
            <>
                <h1 className={this.props.className}>{this.props.label}</h1>
            </>
        );
    }
}

export default (Header);