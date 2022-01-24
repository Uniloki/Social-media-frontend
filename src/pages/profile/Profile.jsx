import './Profile.css'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Feed from '../../components/feed/Feed'
import Rightbar from '../../components/rightbar/Rightbar'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router'
export default function Profile() {
	const [user, setUser] = useState({})
	const username = useParams().username
	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(`/users?username=${username}`)
			setUser(res.data)
			console.log(res.data)
		}
		fetchUser()
	}, [username])

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
									'https://image.shutterstock.com/image-photo/facebook-cover-autumn-background-yellow-260nw-1223596375.jpg'
								}
								alt=""
							/>
							<img
								className="profileUserImg"
								src={
									user.profilePicture ||
									'https://collegecore.com/wp-content/uploads/2018/05/facebook-no-profile-picture-icon-620x389.jpg'
								}
								alt=""
							/>
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">{user.username}</h4>
							<span className="profileInfoDesc">{user.desc}</span>
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
