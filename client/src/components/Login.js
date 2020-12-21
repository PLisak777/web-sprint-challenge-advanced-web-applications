import React from 'react';
import axiosWithAuth from '../api/axiosWithAuth';

class Login extends React.Component {
	// make a post request to retrieve a token from the api
	// when you have handled the token, navigate to the BubblePage route
	state = {
		credentials: {
			username: '',
			password: '',
		},
	};

	handleChange = (e) => {
		this.setState({
			credentials: {
				...this.state.credentials,
				[e.target.name]: e.target.value,
			},
		});
	};

	handleLogin = (e) => {
		e.preventDefault();
		axiosWithAuth()
			.post('/api/login', { username: 'Lambda School', password: 'i<3Lambd4' })
			.then((res) => {
				console.log('pl: Login.js: handleLogin: axios post: res: ', res);
				localStorage.setItem('token', res.data.payload);
				this.props.history.push('/bubble-page');
			})
			.catch((err) => {
				console.error('Error logging in to Bubble Page', err.message);
			});
	};

	render() {
		return (
			<div>
				<form onSubmit={this.handleLogin}>
					<label htmlFor="username">Username: </label>
					<input
						type="text"
						name="username"
						value={this.state.credentials.username}
						onChange={this.handleChange}
					/>
					<label htmlFor="password">Password: </label>
					<input
						type="password"
						name="password"
						value={this.state.credentials.password}
						onChange={this.handleChange}
					/>
					<button>Log in</button>
				</form>
			</div>
		);
	}
}

export default Login;
