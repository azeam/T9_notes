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
			message: []
		};
		// bind to this to call local functions in axios response from child
		this.getSingleNote = this.getSingleNote.bind(this);
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
		// if written category matches existing update dropdown
		if (event.target.name === "category") {
			const [note] = this.state.notes;
			if (note.category === event.target.value) {
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

	newNote() {
		this.setState({
			title: "",
			body: "",
			category: "",
			categoryDropdown: "",
			oldnote: null
		});
	}

	// get old note id from child after selecting a note to edit (or set to null when making a new)
	handleOld = (id) => {
		this.setState({
			oldnote: id
		});
	};

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

	// save as new note
	saveNewNote = (noteData) => {
		axios
			.post("/notes", noteData)
			.then((response) => {
				this.getAllNotes(); // refresh category list			
				this.setState({
					message: Object.entries(response.data)
				});
			})
			.catch((error) => {
				this.handleError(error);
			});
	}

	// update note data
	editNote = (noteData, id) => {
		axios
			.put("/notes/" + id, noteData)
			.then((response) => {
				this.getAllNotes(); // refresh category list
				this.setState({
					message: Object.entries(response.data)
				});
			})
			.catch((error) => {
				this.handleError(error);
			});
	}
	
	// on form submit (save)
	handleSubmit = (event) => {
		event.preventDefault(); // handle form with js
		if (!tokenCheck(history)) { // check if token exists
			return;
		}
        if (this.state.body.length > 0) {
			var bodyTitle = this.state.body.split("\n", 1)[0];
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
        if (!tokenCheck(history)) { // check if token exists
            logout();
		} 
		const authToken = localStorage.getItem("AuthToken");
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get("/notes/" + id)
			.then((response) => {
				// also save to local variable because field will not update (handleChange) if user does not
				// edit both fields
				this.setState({
					body: response.data.body,
					category: response.data.category,
					categoryDropdown: response.data.category
				});
				this.handleOld(id);
			})
			.catch((error) => {
				this.handleError(error);
			});
	}
	
	// will only call on first render
	componentDidMount() {
		this.getAllNotes();
	}
	
    render() {
		return (
		<>
			<Sidebar className="ham-menu" getSingleNote={this.getSingleNote} notes={this.state.notes} newNote={this.newNote} />
			<div className="container">	
				<Header className="header1" label="New note" name="newnote" />
				<div className="noteForm">
					<NoteBody value={this.state.title + this.state.body} id="body" label="New note" name="body" data={this.state.value} onChange={this.handleChange} />
					<Input value={this.state.category} id="category" label="Category" name="category" onChange={this.handleChange} />
					<CategoryDropdown value={this.state.categoryDropdown} id="categoryDropdown" name="categoryDropdown" notes={this.state.notes} onChange={this.handleChange} />
					<MessageBox className="message" message={this.state.message} />
					<SubmitButton className="btn btnBlue" label="SAVE" type="submit" onClick={this.handleSubmit} />
					<SubmitButton className="btn btnBlue" label="LOGOUT" type="submit" onClick={logout} />
				</div>
			</div>
			<Title className="title" label="Super Dementia Helper 2000" name="title" />
		</>
		)
	}
}

export default (NoteForm);
