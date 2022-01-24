import React from 'react'
import Feed from '../../components/feed/Feed'
import Navbar from '../../components/navbar/Navbar'
import Rightbar from '../../components/rightbar/Rightbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Footer from '../../components/footer/Footer'
import './Home.css'
export default function Home() {
	return (
		<>
			<Navbar />
			<div className="homeCont">
				<Sidebar />
				<Feed />
				<Rightbar />
			</div>
			<Footer />
		</>
	)
}
