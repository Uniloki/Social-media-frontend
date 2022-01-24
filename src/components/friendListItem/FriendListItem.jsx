import React from 'react'
import { Link } from 'react-router-dom'
export default function FriendListItem({ user }) {
	return (
		<Link to={`/profile/${user.username}`}>
			<li className="sidebarFriend ">
				<div className="sidebarFriendCont">
					<div>
						<img
							className="postProfileImg"
							src={
								user.profilePicture ||
								'https://qph.fs.quoracdn.net/main-qimg-cf89e8e6daa9dabc8174c303e4d53d3a'
							}
							alt=""
						/>
					</div>
					<div>
						<span className="sidebarFriendName"> {user.username} </span>
					</div>
				</div>
			</li>
		</Link>
	)
}
