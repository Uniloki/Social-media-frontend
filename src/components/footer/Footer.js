import React from 'react'
import { GitHub, Twitter } from '@material-ui/icons'
import './Footer.css'
export default function Footer() {
	return (
		<div className="footer-wrapper">
			<div className="footer-cont">
				<div className="footer-icons">
					<GitHub />
				</div>
				<div className="footer-links">
					<div>
						{' '}
						<ul className="footer-link-list">
							<li> About Us </li> <li> More Info</li>{' '}
						</ul>
					</div>
					<div>
						{' '}
						<ul className="footer-link-list">
							<li> Github</li> <li> Porfolio </li>{' '}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
