import React, { Component } from "react";

class MessageBox extends Component{
    render(){
        return(
            <>
                {this.props.message.map((i, [key, msg]) => <p key={i} className={key}>{`${msg}`}</p>)}
            </>
        );
    }
}

export default (MessageBox);