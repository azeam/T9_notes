import React, { Component } from 'react';
import './TextArea.css'; 

class TextArea extends Component{
    render(){
        return(
            <div>
                <label htmlFor={this.props.name}>{this.props.label}</label><br/>
                <textarea name={this.props.name} id={this.props.id} onChange={this.props.onChange}></textarea><br/>
            </div>
        );
    }
}

export default (TextArea);