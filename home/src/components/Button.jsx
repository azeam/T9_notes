import React, { Component } from 'react';
import './Button.css';
import './Fonts.css';

class Button extends Component {
    render(){
        return(
            <>
                <button className={this.props.className} onClick={this.props.onClick}><span id={this.props.id}></span>{this.props.label}</button>
            </>
        );
    }
}

export default (Button);