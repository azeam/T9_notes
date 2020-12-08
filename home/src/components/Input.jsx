import React, { Component } from 'react';
import './Input.css';

class Input extends Component{
    render(){
        return(
            <div>
                <label for={this.props.name}>{this.props.label}</label><br/>
                <input type={this.props.type} name={this.props.name} id={this.props.id} onChange={this.props.onChange}></input><br/>
            </div>
        );
    }
}

export default (Input);