import React, { Component } from 'react';
import {groupBy} from "../utils/grouper"


class Dropdown extends Component{
    render(){
        const categories = groupBy(this.props.notes, "category");
        return(
            <>
                <select name={this.props.name} id={this.props.id} onChange={this.props.onChange}>
                {
                    Object.entries(categories).map((cat) => {
						let [id, data] = cat;
						return (
							<option key={id}>{id}</option>
						  )
                    })
                }
                </select><br />
            </>
        );
    }
}

export default (Dropdown);