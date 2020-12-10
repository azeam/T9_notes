import React from 'react';
import CatBtn from "./Button";
import './Hamburgerbutton.css';

const groupBy = (data, key) => {
	return data.reduce((acc, x) => {
	  acc[x[key]] = [...(acc[x[key]] || []), x];
	  return acc;
	}, {});
}

class Hambergerbutton extends React.Component{

    // will only render once
	componentDidMount() {
		this.props.getAllNotes();
	}
    
    render() {
        const categories = groupBy(this.props.notes, "category");
        return(
            <div className="">
                {
					Object.entries(categories).map((cat, i) => {
						return (
							<ul key={i}>
							  <p key={cat[0]}>
								  <h3>
									{cat[0]}
								  </h3>
							  </p>
							  {
								cat[1].map((data) => {
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