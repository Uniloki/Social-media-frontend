import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './comment.css'
import { format } from 'timeago.js'
import baseUrl from '../../baseUrl'
export default function Comment({ comment }) {
	const [user, setUser] = useState({})

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(baseUrl + `/users?userId=${comment.userId}`)
			setUser(res.data)
			console.log(user)
		}
		fetchUser()
	}, [comment.userId])

	return (
		<div className="commentWrapper">
			<div className="commentTop">
				<div className="commentTopLeft">
					<Link to={`/profile/${user.username}`}>
						<img
							className="postProfileImg"
							src={
								user.profilePicture ||
								'https://qph.fs.quoracdn.net/main-qimg-cf89e8e6daa9dabc8174c303e4d53d3a'
							}
							alt=""
						/>
					</Link>

					<span className="commentUsername">{user.username}</span>
					<span className="postDate">{format(comment.createdAt)}</span>
				</div>
				<div className="commentTopRight"></div>
			</div>
			<div className="commentCenter">
				<span className="commentText">{comment?.desc}</span>
			</div>
		</div>
	)
}
