import React, { Component } from 'react';
import './Title.css'; 
import './Fonts.css';

class Title extends Component{
    render(){
        return(
            <>
                <h1 name={this.props.name} className={this.props.className}>{this.props.label}</h1>
            </>
        );
    }
}

export default (Title);