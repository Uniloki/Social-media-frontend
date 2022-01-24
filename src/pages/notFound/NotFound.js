import React from 'react'
import Footer from '../../components/footer/Footer'
import Navbar from '../../components/navbar/Navbar'
import './NotFound.css'
export default function NotFound() {
	return (
		<>
			<Navbar />
			<div className="not-found-wrapper">
				<div className="not-found-cont">
					<h1> 404 NOT FOUND </h1>
				</div>
			</div>
			<Footer />
		</>
	)
}
