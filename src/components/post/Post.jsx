import './post.css'
import { Delete, Favorite } from '@material-ui/icons'
import { useState, useEffect, useContext, useRef } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import Comment from '../../components/comment/Comment'
import baseUrl from '../../baseUrl'

export default function Post({ post }) {
	const [showComments, setShowComments] = useState(false)
	const [comments, setComments] = useState([])
	const [like, setLike] = useState(post.likes.length)
	const [isLiked, setIsLiked] = useState(false)
	const [user, setUser] = useState({})
	const desc = useRef()
	const { user: currentUser } = useContext(AuthContext)
	const PF = process.env.REACT_APP_PUBLIC_FOLDER

	const submitHandler = async (e) => {
		e.preventDefault()
		const newComment = {
			userId: currentUser._id,
			desc: desc.current.value,
			postId: post._id,
		}
		try {
			await axios.post(baseUrl + '/comments', newComment).then((res) => {
				setComments([...comments, res.data])
				desc.current.value = ''
			})
		} catch (err) {}
	}

	useEffect(() => {
		console.log(PF)
		setIsLiked(post.likes.includes(currentUser._id))
	}, [currentUser._id, post.likes])

	useEffect(() => {
		const fetchComments = async () => {
			const res = await axios.get(baseUrl + `/comments/${post._id}`)
			setComments(res.data)
		}
		fetchComments()
		console.log(comments)
	}, [post._id])

	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(baseUrl + `/users?userId=${post.userId}`)
			setUser(res.data)
		}
		fetchUser()
	}, [post.userId])

	const likeHandler = () => {
		try {
			axios.put(baseUrl + '/posts/' + post._id + '/like', {
				userId: currentUser._id,
			})
		} catch (err) {
			console.log(err)
		}
		setLike(isLiked ? like - 1 : like + 1)
		setIsLiked(!isLiked)
	}

	const deleteHandler = () => {
		try {
			axios
				.delete(baseUrl + `/posts/${post._id}`, {
					data: { userId: currentUser._id },
				})
				.then((res) => {
					window.location.reload()
				})
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<div className="post">
			<div className="postWrapper">
				<div className="postTop">
					<div className="postTopLeft">
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

						<span className="postUsername">{user.username}</span>
						<span className="postDate">{format(post.createdAt)}</span>
					</div>
					<div
						onClick={(e) => {
							deleteHandler()
						}}
						className="postTopRight"
					>
						{currentUser.username === user.username ? (
							<Delete className="delete-icon" />
						) : (
							<></>
						)}
					</div>
				</div>
				<div className="postCenter">
					<span className="postText">{post?.desc}</span>
					<img
						className="postImg"
						src={'https://res.cloudinary.com/dirftvi1g/' + post.img}
						alt=""
					/>
				</div>
				<div className="postBottom">
					<div className="postBottomLeft">
						{/* <img
							className="likeIcon"
							src="https://www.citypng.com/public/uploads/preview/-51611633744fn9yjateyr.png"
							onClick={likeHandler}
							alt=""
						/> */}
						<Favorite
							className={isLiked ? 'likeIconActive' : 'likeIcon'}
							onClick={likeHandler}
						/>

						<div>
							<span className="postLikeCounter">{like} people like it</span>
						</div>
					</div>
					<div className="postBottomRight">
						<a></a>
						{comments.length != 0 && (
							<span
								onClick={(e) => {
									setShowComments(!showComments)
								}}
								className="postCommentText"
							>
								comments {comments.length}
							</span>
						)}
					</div>
				</div>
				<div>
					<form className="comment-form-cont" onSubmit={submitHandler}>
						<input
							className="comment-form"
							type="text"
							placeholder="Write A Comment.."
							ref={desc}
						></input>
						<button className="comment-form-button"> Comment </button>
					</form>
				</div>
			</div>

			{showComments && (
				<div className="comments-cont">
					{comments.map((c) => (
						<Comment key={c._id} comment={c} />
					))}
				</div>
			)}
		</div>
	)
}
