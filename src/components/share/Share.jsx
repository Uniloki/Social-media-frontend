import React, { useRef, useState } from 'react'
import './Share.css'
import { PermMedia, Label, Room, EmojiEmotions } from '@material-ui/icons'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

export default function Share() {
	const { user } = useContext(AuthContext)
	const desc = useRef()
	const [file, setFile] = useState(null)
	const [isImage, setIsImage] = useState(false)
	const submitHandler = async (e) => {
		e.preventDefault()
		const newPost = {
			userId: user._id,
			desc: desc.current.value,
		}
		if (file) {
			const data = new FormData()
			const fileName = Date.now() + file.name
			data.append('name', fileName)
			data.append('file', file)
			data.append('upload_preset', 'denenjcz')
			console.log(newPost)
			try {
				await axios
					.post('https://api.cloudinary.com/v1_1/dirftvi1g/image/upload', data)
					.then((res) => {
						console.log(res.data.public_id)
						newPost.img = res.data.public_id
					})
			} catch (err) {}
		}
		try {
			await axios.post('/posts', newPost).then((res) => {})
		} catch (err) {}
	}
	return (
		<div className="share">
			<div className="shareWrapper">
				<div className="shareTop">
					<img
						className="shareProfileImg"
						src={
							user.profilePicture
								? user.profilePicture
								: 'https://qph.fs.quoracdn.net/main-qimg-cf89e8e6daa9dabc8174c303e4d53d3a'
						}
						alt=""
					/>
					<input
						placeholder={`What's on your mind ${user.username} ?`}
						className="shareInput"
						ref={desc}
					/>
				</div>
				<hr className="shareHr" />
				<form className="shareBottom" onSubmit={submitHandler}>
					<div className="shareOptions">
						<label htmlFor="file" className="shareOption">
							<PermMedia htmlColor="#9381FF" className="shareIcon" />
							<span className="shareOptionText">Photo</span>
							<input
								type="file"
								style={{ display: 'none' }}
								id="file"
								accept=".png,.jpeg,.jpg"
								onChange={(e) => {
									setFile(e.target.files[0])
									setIsImage(true)
								}}
							/>
						</label>
						<div className="shareOption">
							<Label htmlColor="#9381FF" className="shareIcon" />
							<span className="shareOptionText">Tag</span>
						</div>
						<div className="shareOption">
							<Room htmlColor="#9381FF" className="shareIcon" />
							<span className="shareOptionText">Location</span>
						</div>
						<div className="shareOption">
							<EmojiEmotions htmlColor="#9381FF" className="shareIcon" />
							<span className="shareOptionText">Feelings</span>
						</div>
						<div className="imageOption">
							{isImage && (
								<span className="shareOptionText">Image Uploaded</span>
							)}
						</div>
					</div>
					<button type="submit" className="shareButton">
						Share
					</button>
				</form>
			</div>
		</div>
	)
}
