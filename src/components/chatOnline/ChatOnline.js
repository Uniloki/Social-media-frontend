import axios from 'axios'
import { useEffect, useState } from 'react'
import './chatonline.css'
import baseUrl from '../../baseUrl'
export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
	const [friends, setFriends] = useState([])
	const [onlineFriends, setOnlineFriends] = useState([])
	const PF = process.env.REACT_APP_PUBLIC_FOLDER

	useEffect(() => {
		const getFriends = async () => {
			const res = await axios.get(baseUrl + '/users/friends/' + currentId)
			setFriends(res.data)
			console.log(friends)
		}

		getFriends()
	}, [currentId])

	useEffect(() => {
		setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)))
	}, [friends, onlineUsers])

	const handleClick = async (user) => {
		try {
			const res = await axios.get(
				baseUrl + `/conversations/find/${currentId}/${user._id}`
			)
			setCurrentChat(res.data)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className="chatOnline">
			{onlineFriends.map((o) => (
				<div className="chatOnlineFriend" onClick={() => handleClick(o)}>
					<div className="chatOnlineImageCont">
						<img
							className="chatOnlineImage"
							src={
								o?.profilePicture
									? o.profilePicture
									: 'https://picsum.photos/200'
							}
							alt=""
						/>
						<div className="chatOnlineBadge"> </div>
					</div>
					<span className="chatOnlineName">{o?.username}</span>
				</div>
			))}
		</div>
	)
}
