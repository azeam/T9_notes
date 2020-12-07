import React, { Component } from 'react';
import axios from 'axios';



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
	handleLogin = (event) => {
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

    /*handleSignOut = (event) => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
              console.log('Error', error.message);
            // An error happened.
          });          
    }*/

	render() {
		return (
				<div className="login">
					<h1>
						Log in
					</h1>
					<form className="login" noValidate>
						<label>email</label>
						<input type="text" id="email" name="email" onChange={this.handleChange} required />
						<br/>
						<label>password</label>
						<input type="text" id="password" name="password" onChange={this.handleChange} required />
						<br/>
						<input type="submit" onClick={this.handleSubmit}/>
					</form>
				</div>
		);
	}
}

export default (login);