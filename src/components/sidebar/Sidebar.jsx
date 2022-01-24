import React, { useState, useEffect } from 'react'
import './Sidebar.css'
import { RssFeed, Bookmark, Group } from '@material-ui/icons'
import axios from 'axios'
import FriendListItem from '../friendListItem/FriendListItem'
export default function Sidebar() {
	const [allUsers, setallUsers] = useState([])

	useEffect(() => {
		const getUsers = async () => {
			try {
				const userList = await axios.get('/users/usersList')
				setallUsers(userList.data)
			} catch (err) {
				console.log(err)
			}
		}
		console.log(allUsers)
		getUsers()
	}, [])

	return (
		<div className="sidebar">
			<div className="sidebarWrapper">
				<ul className="sidebarList">
					<li className="sidebarListItem">
						<RssFeed className="sidebarIcon" />
						<span className="sidebarListItemText"> Feed </span>
					</li>
					<li className="sidebarListItem">
						<Group className="sidebarIcon" />
						<span className="sidebarListItemText"> Group </span>
					</li>
					<li className="sidebarListItem">
						<Bookmark className="sidebarIcon" />
						<span className="sidebarListItemText"> Bookmarks </span>
					</li>
				</ul>
				<button className="sidebarButton"> show more </button>
				<hr className="sidebarHr" />
				<ul className="sidebarFriendList">
					{allUsers.map((u) => (
						<FriendListItem key={u._id} user={u} />
					))}
				</ul>
			</div>
		</div>
	)
}
