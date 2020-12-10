import React, { Component } from "react";
import axios from "axios";
import SubmitButton from "../components/Button";
import NoteBody from "../components/TextArea";
import history from "../utils/history";
import "../components/Background.css";
import Header from "../components/Header";
import Title from "../components/Title";

const tokenCheck = () => {
    const authToken = localStorage.getItem("AuthToken");
    if (authToken === null) {
		history.push("/login"); // go to login page
		return false;
	}
	return true;
}

const logout = () => {
	const authToken = localStorage.getItem("AuthToken");
	if (authToken !== null) {
		localStorage.removeItem("AuthToken");
	}
	history.push("/login");
}

function groupBy(data, key) {
	return data.reduce((acc, x) => {
	  acc[x[key]] = [...(acc[x[key]] || []), x];
	  return acc;
	}, {});
}

class NoteForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: [],
			title: "",
			body: "",
			category: ""
		};
	}

	// update form field data
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};
	
	handleSubmit = (event) => {
		event.preventDefault(); // handle form with js
		if (!tokenCheck(history)) { // check if token exists
			return;
		}
        if (this.state.body.length > 0) {
			var bodyTitle = this.state.body.split("\n", 1)[0];
			// var bodyBody = this.state.body.substring(bodyTitle.length, this.state.body.length); // Erase the title and continue
        }
		const newNoteData = {
			title: bodyTitle,
			body: this.state.body,
			category: this.state.category
		};

    // handleSubmit = (event) => {
	// 	event.preventDefault(); // handle form with js
	// 	const newNoteData = {
	// 		title: this.state.title,
	// 		body: this.state.body,
	// 		category: this.state.category
	// 	};
		
		const authToken = localStorage.getItem("AuthToken");
		axios.defaults.headers.common = { Authorization: `${authToken}` };

		axios
			.post("/notes", newNoteData)
			.then((response) => {
				this.getAllNotes(); // refresh category list
				console.log("note saved");
			})
			.catch((error) => {
				if (error.response) {
					if (error.response.status === 403) {
						/* 
							TODO: no access, probably because token has expired, now it will delete the local token 
							and send the user to the login page. This is likely not a user friendly solution, should be handled 
							in a better way
						*/ 
						logout();
					}
					console.log(error.response.data); // print api response
				} 
				else {
					console.log("Error", error.message);
				}
			});
	};

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
					if (error.response.status === 403) { // expired token, delete and send user to login page
						logout();
					}
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
		return (
			<>
				<div className="container">	
					{
						Object.entries(categories).map((cat, i) => {
							return (
								<ul key={i}>
								<li key={cat[0]}><h3>{cat[0]}</h3></li>
								{
									cat[1].map((data) => {
										return (
											<li key={data.noteId} id={data.noteId}>
												{data.body}
											</li>
										)
									})
								}
								</ul>
							)
						})
					}
					
					<Header className="header1" label="New note" name="newnote"></Header>
					<div className="noteForm">
						<NoteBody id="body" label="New note" name="body" onChange={this.handleChange}></NoteBody>
						<NoteBody id="category" label="Category" name="category" onChange={this.handleChange}></NoteBody>
						<SubmitButton className="btn btnBlue" label="SAVE" type="submit" onClick={this.handleSubmit}></SubmitButton>
					</div>
					<SubmitButton className="btn btnBlue" label="LOGOUT" type="submit" onClick={logout}></SubmitButton>
				</div>
				<Title className="title" label="Super Dementia Helper 2000" name="title"></Title>
			</>
		);
	}
}

export default (NoteForm);