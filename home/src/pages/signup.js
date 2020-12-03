import React, { Component } from 'react';
import axios from 'axios';

class signup extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			email: '',
			password: '',
			confirmPassword: ''
		};
    }

	// update form field data
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	// send request to api
	handleSubmit = (event) => {
		event.preventDefault(); // handle form with js
		const newUserData = {
			username: this.state.username,
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword
		};
		axios
			.post('/signup', newUserData) // the proxy setting in package.json will re-route the request to the firebase db with /signup postpended, set to  https://us-central1-t9notes-5eb44.cloudfunctions.net/api if not running local api
			.then((response) => {
				console.log("token: ", `${response.data.token}`); // print token to console for debug
				localStorage.setItem('AuthToken', `${response.data.token}`); // save token in local storage
				this.props.history.push('/'); // go home
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
				<div className="signup">
					<h1>
						Sign up
					</h1>
					<form className="signup" noValidate>
						<label>name</label>
						<input type="text" id="username" name="username" onChange={this.handleChange} required />
						<br/>
						<label>email</label>
						<input type="text" id="email" name="email" onChange={this.handleChange} required />
						<br/>
						<label>password</label>
						<input type="text" id="password" name="password" onChange={this.handleChange} required />
						<br/>
						<label>confirm password</label>
						<input type="text" id="confirmPassword" name="confirmPassword" onChange={this.handleChange} required />
						<br/>
						<input type="submit" onClick={this.handleSubmit}/>
					</form>
				</div>
		);
	}
}

export default (signup);