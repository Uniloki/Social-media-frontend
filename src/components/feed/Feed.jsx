import React, { useState, useEffect } from 'react'
import Post from '../post/Post'
import Share from '../share/Share'
import axios from 'axios'
import './Feed.css'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import baseUrl from '../../baseUrl'
export default function Feed({ username }) {
	const [posts, setPosts] = useState([])
	const { user } = useContext(AuthContext)
	useEffect(() => {
		const fetchPosts = async () => {
			const res = username
				? await axios.get(baseUrl + '/posts/profile/' + username)
				: await axios.get(baseUrl + '/posts/timeline/' + user._id)
			setPosts(
				res.data.sort((p1, p2) => {
					return new Date(p2.createdAt) - new Date(p1.createdAt)
				})
			)
		}
		fetchPosts()
	}, [username, user._id])
	return (
		<div className="feed">
			<div className="feedWrapper">
				{(!username || username === user.username) && <Share />}
				{posts.map((p) => (
					<Post key={p._id} post={p} />
				))}
			</div>
		</div>
	)
}
