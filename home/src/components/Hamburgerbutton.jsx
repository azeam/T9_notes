import React from 'react';
import CatBtn from "./Button";
import {groupBy} from "../utils/grouper"
import './Hamburgerbutton.css';

class Hambergerbutton extends React.Component{
    
    render() {
        const categories = groupBy(this.props.notes, "category");
        return(
            <div className="">
                {
					Object.entries(categories).map((cat) => {
						let [id, allData] = cat;
						return (
							<ul key={id}>
							  <p>
								  <h3>
									{id}
								  </h3>
							  </p>
							  {
								allData.map((data) => {
									return (
										<CatBtn label={data.body} key={data.noteId} id={data.noteId} onClick={() => { this.props.getSingleNote(data.noteId) }}>
											{data.body}
										</CatBtn>
									)
								})
							  }
							</ul>
						  )
					})
				}
            </div>
        );
    }
}

export default (Hambergerbutton);