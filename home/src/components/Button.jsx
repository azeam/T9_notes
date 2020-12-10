import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    render(){
        return(
            <div>
                <button className={this.props.className} onClick={this.props.onClick}><span id={this.props.id}></span>{this.props.label}</button>
            </div>
        );
    }
}

export default (Button);