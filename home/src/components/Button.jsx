import react, { Component } from 'react';

class Button extends Component {
    render(){
        return(
            <div>
                <button onClick={this.props.onClick}>SAVE</button>
            </div>
        );
    }
}

export default (Button);