import React, { Component } from 'react';

class MessageBox extends Component{
    render(){
        return(
            <div>
                {this.props.message.map(([key, msg]) => <p>{`${key}: ${msg}`}</p>)}
            </div>
        );
    }
}

export default (MessageBox);