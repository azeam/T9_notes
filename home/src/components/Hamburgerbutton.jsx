import React from 'react';
import axios from "axios";
import history from "../utils/history";
import CatBtn from "./Button";
import './Hamburgerbutton.css';

const tokenCheck = () => {
    const authToken = localStorage.getItem("AuthToken");
    if (authToken === null) {
		history.push("/login"); // go to login page
		return false;
	}
	return true;
}

function groupBy(data, key) {
	return data.reduce((acc, x) => {
	  acc[x[key]] = [...(acc[x[key]] || []), x];
	  return acc;
	}, {});
}

class Hambergerbutton extends React.Component{
    constructor(props) {
		super(props);

		this.state = {
            notes: [],
            title: "",
			body: "",
			category: ""
		};
	}

    getAllNotes = () => {
		if (!tokenCheck(history)) { // check if token exists
			return;
		} 
		const authToken = localStorage.getItem("AuthToken");
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get("/notes")
			.then((response) => {
				this.setState({
					notes: response.data
				});
			})
			.catch((error) => {
				if (error.response) {
					// if (error.response.status === 403) { // expired token, delete and send user to login page
					// 	logout();
					// }
					console.log(error.response.data); // print api response
				} 
				else {
					console.log("Error", error.message);
				}
			});
	}
	
	getSingleNotes(id) {
		if (!tokenCheck(history)) { // check if token exists
			return;
		} 
		const authToken = localStorage.getItem("AuthToken");
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get("/notes/" + id)
			.then((response) => {
				document.getElementById("body").value = response.data.body
				// this.setState({
				// 	notes: response.data
				// });
			})
			.catch((error) => {
				if (error.response) {
					// if (error.response.status === 403) { // expired token, delete and send user to login page
					// 	logout();
					// }
					console.log(error.response.data); // print api response
				} 
				else {
					console.log("Error", error.message);
				}
			});
    }
    
    // will only render once
	componentDidMount = () => {
		this.getAllNotes();
	};
    
    render() {
        const categories = groupBy(this.state.notes, "category");
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
										<CatBtn label={data.body} key={data.noteId} id={data.noteId}>
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