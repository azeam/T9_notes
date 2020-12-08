import React, { Component } from 'react';
import axios from 'axios';
import SubmitButton from '../components/Button';
import LoginInput from '../components/Input';

class login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
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
		const newLoginData = {
			email: this.state.email,
			password: this.state.password
		};
		axios
			.post('/login', newLoginData) // the proxy setting in package.json will re-route the request to the firebase db with /signup postpended, set to  https://us-central1-t9notes-5eb44.cloudfunctions.net/api if not running local api
			.then((response) => {
				console.log("token: ", `${response.data.token}`); // print token to console for debug
				localStorage.setItem('AuthToken', `${response.data.token}`); // save token in local storage
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
			<form className="login">
				<h1>Login</h1>
				<LoginInput type="email" id="email" label="E-mail" name="email" onChange={this.handleChange}></LoginInput>
				<LoginInput type="password" id="password" label="Password" name="password" onChange={this.handleChange}></LoginInput>
				
				<SubmitButton className="btn" label="LOGIN" type="submit" onClick={this.handleSubmit}></SubmitButton>
			</form>
		);
	}
}

export default (login);