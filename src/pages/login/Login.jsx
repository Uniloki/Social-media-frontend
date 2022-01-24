import React, { useRef, useContext } from 'react'
import { loginCall } from '../../apiCalls'
import { AuthContext } from '../../context/AuthContext'
import './login.css'
import { CircularProgress } from '@material-ui/core'
import { Link } from 'react-router-dom'
export default function Login() {
	const email = useRef()
	const password = useRef()
	const { user, isFetching, error, dispatch } = useContext(AuthContext)
	const handleClick = (e) => {
		e.preventDefault()
		loginCall(
			{ email: email.current.value, password: password.current.value },
			dispatch
		)
		console.log(error)
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
					<form className="loginBox" onSubmit={handleClick}>
						<input
							placeholder="Email"
							type="email"
							className="loginInput"
							required
							ref={email}
						></input>
						<input
							placeholder="Password"
							type="password"
							className="loginInput"
							required
							minLength={6}
							ref={password}
						></input>
						{error ? (
							<span className="error-message">
								The password you’ve entered is incorrect.
							</span>
						) : (
							<span> Please enter your email and password. </span>
						)}
						<button disabled={isFetching} className="loginRegister">
							{isFetching ? <CircularProgress color="white" /> : 'Login'}
						</button>
						<Link className="loginRegister" to="/register">
							<button className="loginRegister">
								{' '}
								{isFetching ? (
									<CircularProgress color="tan" />
								) : (
									'Create A New Account'
								)}
							</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	)
}
