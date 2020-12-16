import React, { Component } from "react";

class MessageBox extends Component{
    render(){
        return(
            <>
                {this.props.message.map(([key, msg], i) => <p key={i} className={key}>{`${msg}`}</p>)}
            </>
        );
    }
}

export default (MessageBox);