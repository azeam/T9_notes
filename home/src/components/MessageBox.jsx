import React, { Component } from "react";

class MessageBox extends Component{
    render(){
        return(
            <>
                {this.props.message.map(([key, msg]) => <p className={key}>{`${msg}`}</p>)}
            </>
        );
    }
}

export default (MessageBox);