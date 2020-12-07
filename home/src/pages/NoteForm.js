import React, { Component } from 'react';
import axios from 'axios';
import Button from '../components/Button';
import Note from '../components/noteForm';

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
			var bodyBody = this.state.body.substring(bodyTitle.length, this.state.body.length); // Erase the title and continue
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
		console.log(authToken);
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
    
    render() {
		return (
				<div className="noteForm">
					<Note className="noteForm" onChange={this.handleChange}></Note>
					{/* <form className="noteForm" noValidate>
						<label>Title</label><br/>
						<input type="text" id="title" name="title" onChange={this.handleChange} required />
						<br/>
						<label>Note</label><br/>
						<input type="text" id="note" name="body" onChange={this.handleChange} required /><br/>
						<label>Category</label><br/>
						<input type="text" id="category" name="category" onChange={this.handleChange} required /><br/>
						<input type="submit" onClick={this.handleSubmit}/>
					</form>  */}
						<Button label="SAVE" type="submit" onClick={this.handleSubmit}></Button>
				</div>
		);
	}
}

export default (NoteForm);