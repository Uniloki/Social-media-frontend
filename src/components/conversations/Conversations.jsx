import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import './conversations.css'
export default function Conversations({ conversation, currentUser }) {
	const [user, setUser] = useState('')

	useEffect(() => {
		const friendId = conversation.members.find((m) => m !== currentUser._id)

		const getUser = async () => {
			try {
				const res = await axios('/users?userId=' + friendId)
				setUser(res.data)
				console.log(res.data)
			} catch (err) {
				console.log(err)
			}
		}
		getUser()
	}, [currentUser, conversation])

	return (
		<div className="conversation">
			<img
				className="conversationImage"
				src={
					user.profilePicture
						? user.profilePicture
						: 'https://qph.fs.quoracdn.net/main-qimg-cf89e8e6daa9dabc8174c303e4d53d3a'
				}
				alt=""
			/>
			<span className="conversationName"> {user?.username} </span>
		</div>
	)
}
