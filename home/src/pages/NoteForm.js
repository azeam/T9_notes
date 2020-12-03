import React, { Component } from 'react';
import axios from 'axios';
import Button from '../components/Button';

class NoteForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			note: ''
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
		const newNoteData = {
			title: this.state.title,
			note: this.state.note
		};
		axios
			.post('/notes', newNoteData)
			.then((response) => {
				console.log("A");
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
    
    render() {
		return (
				<div className="noteForm">
					<h1>
						Add new note
					</h1>
					<form className="noteForm" noValidate>
						<label>Title</label>
						<input type="text" id="title" name="title" onChange={this.handleChange} required />
						<br/>
						<label>Note</label>
						<input type="text" id="note" name="note" onChange={this.handleChange} required />
						{/* <input type="submit" onClick={this.handleSubmit}/> */}
						<Button onClick={this.handleSubmit}></Button>
					</form>
				</div>
		);
	}
}

export default (NoteForm);