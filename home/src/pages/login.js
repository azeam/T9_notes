import React, { Component } from "react";
import axios from "axios";
import SubmitButton from "../components/Button";
import LoginInput from "../components/Input";
import history from "../utils/history";
import "../components/Background.css";
import Header from "../components/Header";
import Title from "../components/Title";
import MessageBox from "../components/MessageBox";

class login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			message: []
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
			.post("/login", newLoginData) // the proxy setting in package.json will re-route the request to the firebase db with /signup postpended, set to  https://us-central1-t9notes-5eb44.cloudfunctions.net/api if not running local api
			.then((response) => {
				localStorage.setItem("AuthToken", `Bearer ${response.data.token}`);
				history.push("/"); // go home
			})
			.catch((error) => {
				if (error.response) {
					this.setState({
						message: Object.entries(error.response.data)
					});
				} 
				else {
					this.setState({
						message: Object.entries({"Error": error.message})
					});
				}
			});
	};

	render() {
		return (
			<>
				<div className="container">
					<form className="login">
						<LoginInput type="email" id="email" label="E-mail" name="email" onChange={this.handleChange}></LoginInput>
						<LoginInput type="password" id="password" label="Password" name="password" onChange={this.handleChange}></LoginInput>
						
						<MessageBox className="message" message={this.state.message}></MessageBox>
						
						<SubmitButton id="btnlogin" className="btn" label="LOGIN" type="submit" onClick={this.handleSubmit}></SubmitButton>	
					</form>
					<Header className="header1" label="Log in" name="login"></Header>
				</div>
				<Title className="title" label="Super Dementia Helper 2000" name="title"></Title>
			</>
		);
	}
}

export default (login);