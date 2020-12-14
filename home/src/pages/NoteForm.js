import React, { Component } from "react";
import axios from "axios";
import SubmitButton from "../components/Button";
import NoteBody from "../components/TextArea";
import history from "../utils/history";
import {logout, tokenCheck} from "../utils/handleToken";
import Sidebar from "../components/Sidebar";
import "./NoteForm.css";
import "../components/Background.css";
import Header from "../components/Header";
import Title from "../components/Title";

class NoteForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: [],
			title: "",
			body: "",
			category: "",
			oldnote: null
		};
		// bind to this to call local functions in axios response from child
		this.getSingleNote = this.getSingleNote.bind(this); 
	}

	// update form field to set data from
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	// get old note id from child after selecting a note to edit (or set to null when making a new)
	handleOld = (id) => {
		this.setState({
			oldnote: id
		});
		console.log("oldnote :" + this.state.oldnote);
	};

	// get all notes by user
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
				console.log(response);
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

	// save as new note
	saveNewNote = (noteData) => {
		axios
			.post("/notes", noteData)
			.then((response) => {
				this.getAllNotes(); // refresh category list
				console.log(response);
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
	}

	// update note data
	editNote = (noteData, id) => {
		axios
			.put("/notes/" + id, noteData)
			.then((response) => {
				this.getAllNotes(); // refresh category list
				console.log(response);
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
	}
	
	// on form submit (save)
	handleSubmit = (event) => {
		console.log("submit handler old note id " + this.state.oldnote);
		event.preventDefault(); // handle form with js
		if (!tokenCheck(history)) { // check if token exists
			return;
		}
        if (this.state.body.length > 0) {
			var bodyTitle = this.state.body.split("\n", 1)[0];
			// var bodyBody = this.state.body.substring(bodyTitle.length, this.state.body.length); // Erase the title and continue
        }
		const noteData = {
			title: bodyTitle,
			body: this.state.body,
			category: this.state.category
		};
		
		const authToken = localStorage.getItem("AuthToken");
		axios.defaults.headers.common = { Authorization: `${authToken}` };

		// if olddata is null save as new, otherwise use id to update
		if (this.state.oldnote === null) {
			this.saveNewNote(noteData);
		}
		else {
			this.editNote(noteData, this.state.oldnote);
		}
	};

	// open single note for editing/reading
	getSingleNote(id) {
		console.log("called single note function");
        if (!tokenCheck(history)) { // check if token exists
            logout();
		} 
		const authToken = localStorage.getItem("AuthToken");
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get("/notes/" + id)
			.then((response) => {
				document.getElementById("body").value = response.data.body;
				document.getElementById("category").value = response.data.category;
				// also save to local variable because field will not update (handleChange) if user does not
				// edit both fields
				this.setState({
					body: response.data.body,
					category: response.data.category
				});
				this.handleOld(id);
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
	
	// will only call on first render
	componentDidMount() {
		this.getAllNotes();
	}
	
    render() {
		return (

			<>
        <Sidebar className="ham-menu" getSingleNote={this.getSingleNote} notes={this.state.notes}>
        </Sidebar>
        <div className="container">	
          <Header className="header1" label="New note" name="newnote"></Header>
          <div className="noteForm">
            <NoteBody id="body" label="New note" name="body" data={this.state.value} onChange={this.handleChange}>{this.handleChange}</NoteBody>
            <NoteBody id="category" label="Category" name="category" onChange={this.handleChange}>{this.handleChange}</NoteBody> {/*  change this to dropdown */}
            <SubmitButton className="btn btnBlue" label="SAVE" type="submit" onClick={this.handleSubmit}></SubmitButton>
            <SubmitButton className="btn btnBlue" label="LOGOUT" type="submit" onClick={logout}></SubmitButton>
          </div>
        </div>

      	<Title className="title" label="Super Dementia Helper 2000" name="title"></Title>
      </>

		)
	}
}

// test

export default (NoteForm);