import axios from 'axios'
import React, { useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './register.css'
import baseUrl from '../../baseUrl'
export default function Register() {
	const username = useRef()
	const email = useRef()
	const password = useRef()
	const passwordConfirm = useRef()
	const navigate = useNavigate()

	const handleClick = async (e) => {
		e.preventDefault()
		if (passwordConfirm.current.value !== password.current.value) {
			passwordConfirm.current.setCustomValidity('Passwords do not match!')
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			}
			try {
				await axios.post(baseUrl + '/auth/register', user)
				navigate('/login')
			} catch (err) {
				console.log(err)
			}
		}
	}
	return (
		<div className="login">
			<div className="loginWrapper">
				<div className="loginLeft">
					<h3 className="loginLogo">The Wooden Table</h3>
					<span className="loginDesc">
						A place for all my friends to come together!
					</span>
				</div>
				<div className="loginRight">
					<form onSubmit={handleClick} className="registerBox">
						<input
							placeholder="Name"
							ref={username}
							className="loginInput"
							required
						></input>
						<input
							placeholder="Email"
							ref={email}
							type="email"
							className="loginInput"
							required
						></input>
						<input
							placeholder="Password"
							ref={password}
							className="loginInput"
							required
							type="password"
						></input>
						<input
							placeholder="Confirm Password"
							ref={passwordConfirm}
							className="loginInput"
							required
							type="password"
						></input>
						<button className="loginRegister" type="submit">
							{' '}
							Sign Up{' '}
						</button>
						<Link to="/">
							<button className="loginRegister"> Login Into Account </button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	)
}
