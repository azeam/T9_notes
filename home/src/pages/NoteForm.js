import React, { Component } from 'react';
import axios from 'axios';
import SubmitButton from '../components/Button';
import NoteBody from '../components/TextArea';

class NoteForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			body: '',
			category: ''
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
        if(this.state.body.length > 0)
        {
			var bodyTitle = this.state.body.split('\n', 1)[0];
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

		const authToken = localStorage.getItem('AuthToken');
		axios.defaults.headers.common = { Authorization: `${authToken}` };

		axios
			.post('/notes', newNoteData)
			.then((response) => {
				this.props.history.push('/newnote'); // go home
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response.data); // print api response
				} 
				else {
					console.log('Error', error.message);
				}
			});
	};
	
	getOldNotes = (event) => {
		const authToken = localStorage.getItem('AuthToken');
		console.log(authToken);
		axios.defaults.headers.common = { Authorization: `${authToken}` };
		axios
			.get('/notes')
			.then((response) => {
				response.data.forEach((note) => {
					console.log(note.noteId);
					console.log(note.body);
				})
				return response; // go home
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response.data); // print api response
				} 
				else {
					console.log('Error', error.message);
				}
				// delete token, send to login page on error
				// this.props.history.push('/login'); // go home
			});
	};

    render() {
		return (
			<div className="container">
				<div className="oldNotes">
					<div>{this.getOldNotes()}</div>
				</div>
				<div className="noteForm">
					<NoteBody id="body" label="New note" name="body" onChange={this.handleChange}></NoteBody>
					<NoteBody  id="category" label="Category" name="category" onChange={this.handleChange}></NoteBody>
					<SubmitButton className="btn btnBlue" label="SAVE" type="submit" onClick={this.handleSubmit}></SubmitButton>
				</div>
			</div>
		);
	}
}

export default (NoteForm);