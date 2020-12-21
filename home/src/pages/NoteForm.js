import React, { Component } from "react";
import axios from "axios";
import SubmitButton from "../components/Button";
import NoteBody from "../components/TextArea";
import CategoryDropdown from "../components/Dropdown";
import history from "../utils/history";
import {logout, tokenCheck} from "../utils/handleToken";
import Sidebar from "../components/Sidebar";
import "./NoteForm.css";
import "../components/Background.css";
import Header from "../components/Header";
import Title from "../components/Title";
import MessageBox from "../components/MessageBox";
import Input from "../components/Input";

const arrayContains = (array, item) => array.filter(function(note) {
	return note.category === item
}); 

class NoteForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			notes: [],
			title: "",
			body: "",
			category: "",
			oldnote: null,
			categoryDropdown: "",
			message: [],
			action: "save",
			header: "New note"
		};
		// bind to this to call local functions in axios response from child
		this.handleSingleNote = this.handleSingleNote.bind(this);
		this.newNote = this.newNote.bind(this);
	}

	// update form field to set data from
	handleChange = (event) => {
		// also updated input field when changing dropdown
		if (event.target.name === "categoryDropdown") {
			this.setState({
				category: event.target.value
			});	
		}
		// update dropdown if written category matches existing
		if (event.target.name === "category") {
			if (arrayContains(this.state.notes, event.target.value).length > 0) { // not returning a bool, needs length check, gotta love JS sometimes...
				this.setState({
					categoryDropdown: event.target.value
				});
			}
			else {
				this.setState({
					categoryDropdown: ""
				});
			}
		}
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	// emptys the textarea and category-area
	// sets the state for new note
	newNote() {
		this.setState({
			title: "",
			body: "",
			category: "",
			categoryDropdown: "",
			oldnote: null,
			action: "save",
			header: "New note"
		});
	}

	// set error msg to show user
	handleError = (error) => {
		if (error.response) {
			if (error.response.status === 403) { // token not (longer) valid
				logout();
			}
			else {
				this.setState({
					message: Object.entries(error.response.data)
				});
			}
		}
		else {
			this.setState({
				message: Object.entries({ error: error.message})
			});
		}
	}

	// show api response for 3 seconds
	handleMessage = (message) => {
		this.setState({
			message: Object.entries(message)
		});
		setTimeout(() => {
			this.setState({
			  message: []
			});
		}, 3000)
	}

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
			})
			.catch((error) => {
				this.handleError(error);
			});
	}

	// save/edit/delete note compacted as single function
	changeNote = (noteData, id) => {
		if (!tokenCheck(history)) {
			return;
		}
		const authToken = localStorage.getItem("AuthToken");
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios({
			method: this.state.action === "save" ? "POST" : this.state.action === "edit" ? "PUT" : "DELETE",
			url: this.state.action === "save" ? "/notes" : "/notes/" + id,
			data: noteData
		})
		.then((response) => {
			this.getAllNotes(); // refresh category list
			this.handleMessage(response.data);			
			if (this.state.action === "save") {
				this.newNote(); // reset form after saving new note, not after edit or delete
			}
		})
		.catch((error) => {
			this.handleError(error);
		});
	}
	
	// handle form submit
	handleSubmit = (event) => {
		event.preventDefault(); // handle form with js
        if (this.state.body.length > 0) {
			var bodyTitle = this.state.body.split("\n", 1)[0];
        }
		const noteData = {
			title: bodyTitle,
			body: this.state.body,
			category: this.state.category
		};
		this.changeNote(noteData, this.state.oldnote);
	};

	// get note from db and display in form
	getSingleNote = (id) => {
		if (!tokenCheck(history)) { // check if token exists
			logout();
		}
		const authToken = localStorage.getItem("AuthToken");
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get("/notes/" + id)
			.then((response) => {
				this.setState({
					body: response.data.body,
					category: response.data.category,
					categoryDropdown: response.data.category,
					oldnote: id,
					action: "edit",
					header: "Edit note"
				});
			})
			.catch((error) => {
				this.handleError(error);
			});
	}

	// handle single note action
	handleSingleNote = (id, action) => {
		if (action === "delete") {
			this.setState({
				oldnote: id,
				action: "delete"
			}, () => {
				// needs to wait for state to update
				this.changeNote(null, id);
			});
		}
		else {
			this.getSingleNote(id);
		}
	}
	
	// will only call on first render
	componentDidMount() {
		this.getAllNotes();
	}
	
    render() {
		return (
		<>
			<div className="container">	

			<Sidebar className="ham-menu" handleSingleNote={this.handleSingleNote} notes={this.state.notes} newNote={this.newNote}/>
				<Header className="header1" label={this.state.header} name="newnote" />
				<div className="noteForm">
					<NoteBody value={this.state.body} id="body" name="body" data={this.state.value} onChange={this.handleChange} />
					<Input value={this.state.category} id="category" label="Category" name="category" onChange={this.handleChange} />
					<CategoryDropdown value={this.state.categoryDropdown} id="categoryDropdown" name="categoryDropdown" notes={this.state.notes} onChange={this.handleChange} />
					<MessageBox className="message" message={this.state.message} />
					<SubmitButton id="btn-note" className="btn btnBlue" label="SAVE" type="submit" onClick={this.handleSubmit} />
					<SubmitButton id="btn-logout" className="btn btnBlue" label="LOGOUT" type="submit" onClick={logout} />
				</div>
			</div>
			<Title className="title" label="Super Dementia Helper 2000" name="title" />
		</>
		)
	}
}

export default (NoteForm);
