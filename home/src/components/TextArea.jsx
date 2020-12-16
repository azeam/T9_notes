import React, { Component } from 'react';
import './TextArea.css'; 

class TextArea extends Component{
    render(){
        return(
            <>
                <label htmlFor={this.props.name}>{this.props.label}</label><br/>
                <textarea value={this.props.value} name={this.props.name} id={this.props.id} onChange={this.props.onChange}></textarea><br/>
            </>
        );
    }
}

export default (TextArea);