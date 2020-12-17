import React, { Component } from 'react';
import './TextArea.css'; 
import './Fonts.css';

class TextArea extends Component{
    render(){
        return(
            <>
                <textarea value={this.props.value} name={this.props.name} id={this.props.id} onChange={this.props.onChange}></textarea><br/>
            </>
        );
    }
}

export default (TextArea);