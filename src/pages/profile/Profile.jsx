import './Profile.css'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios'
import { useState, useEffect, useContext, useRef } from 'react'
import { useParams } from 'react-router'
import baseUrl from '../../baseUrl'
import { AuthContext } from '../../context/AuthContext'
export default function Profile() {
	const [user, setUser] = useState({})
	const [bioFormReveal, setBioFormReveal] = useState(false)
	const { user: currentUser, dispatch } = useContext(AuthContext)
	const username = useParams().username
	const description = useRef()
	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(baseUrl + `/users?username=${username}`)
			setUser(res.data)
			console.log(res.data)
		}
		fetchUser()
	}, [username])

	const submitHandler = async (e) => {
		e.preventDefault()
		await axios.put(baseUrl + `/users/${user._id}`, {
			userId: currentUser._id,
			desc: description.current.value,
		})
	}

	return (
		<>
			<Navbar />
			<div className="profile">
				<Sidebar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img
								className="profileCoverImg"
								src={
									user.coverPicture ||
									'https://newevolutiondesigns.com/images/freebies/white-facebook-cover-preview-18.jpg'
								}
								alt=""
							/>
							<a href="" className="profileUserCover">
								<img
									className="profileUserImg"
									src={
										user.profilePicture ||
										'https://collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg'
									}
									alt=""
								/>
							</a>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{user.username}</h4>
							<span className="profileInfoDesc">{user.desc}</span>
							{user.username == currentUser.username && (
								<div>
									<a
										onClick={(e) => {
											setBioFormReveal(!bioFormReveal)
										}}
										className="profileBioAdd"
									>
										{(user.desc && 'Edit Bio') || 'Add Bio'}
									</a>
								</div>
							)}
							{bioFormReveal && (
								<div>
									<form onSubmit={submitHandler} className="bioForm">
										<textarea
											ref={description}
											placeholder="Describe a little bit about you... "
											className="bioField"
										></textarea>
										<button> Submit </button>
									</form>
								</div>
							)}
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed username={username} />
						<Rightbar user={user} />
					</div>
				</div>
			</div>
		</>
	)
}
