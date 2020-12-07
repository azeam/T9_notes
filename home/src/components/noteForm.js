import React, { Component } from 'react';

class noteForm extends Component{
    render(){
        return(
            <div className="noteForm">
                <h1>
                    Add a new note
                </h1>
                <form>
                    <textarea className="textNote"></textarea><br/>
                    <label>Category</label><br/>
					<input type="text" id="category" name="category" onChange={this.handleChange} required /><br/>
                </form>
            </div>
        );
    }
}

export default (noteForm);