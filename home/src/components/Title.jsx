import React, { Component } from 'react';
import './Title.css'; 

class Title extends Component{
    render(){
        return(
            <div>
                <h1 name={this.props.name} className={this.props.className}>{this.props.label}</h1>
            </div>
        );
    }
}

export default (Title);