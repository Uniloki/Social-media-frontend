import React, { useContext } from 'react'
import { Search, Person, Chat, Notifications } from '@material-ui/icons'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
export default function Navbar() {
	let navigate = useNavigate()
	const logoutHandler = () => {
		window.localStorage.clear()
		navigate('/')
		window.location.reload()
	}

	const { user } = useContext(AuthContext)

	return (
		<div className="navBarCont">
			<div className="navBarLeft">
				<Link to="/" style={{ textDecoration: 'none' }}>
					<span className="logo">The Wooden Table</span>
				</Link>
			</div>
			<div className="navBarCenter">
				<div className="searchBar">
					<Search className="searchIcon" />
					<input placeholder="Search..." className="searchInput" />{' '}
				</div>
			</div>
			<div className="navBarRight">
				<div className="navBarLinkCont">
					<Link to={`/`}>
						<span className="navBarLink"> Home </span>
					</Link>
					<Link to={`/profile/${user.username}`}>
						<span className="navBarLink"> Profile </span>
					</Link>

					<span
						onClick={(e) => {
							logoutHandler()
						}}
						className="navBarLink"
					>
						{' '}
						Logout{' '}
					</span>
				</div>
				<div className="navBarIconCont">
					<div className="navbarIcon">
						<Person />
						<span className="navBarIconBadge"> 1 </span>
					</div>
					<div className="navbarIcon">
						<Link to={'/messenger'}>
							<Chat />
						</Link>
						<span className="navBarIconBadge"> </span>
					</div>
					<div className="navbarIcon">
						<Notifications />
						<span className="navBarIconBadge"> 1 </span>
					</div>
				</div>
			</div>
			<Link to={`/profile/${user.username}`}>
				<img
					src={
						user.profilePicture
							? user.profilePicture
							: 'https://qph.fs.quoracdn.net/main-qimg-cf89e8e6daa9dabc8174c303e4d53d3a'
					}
					alt="This is your profile picture"
					className="navBarImage"
				/>
			</Link>
		</div>
	)
}
