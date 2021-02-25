import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
	return (
		<nav className="topNavBar">
			<div className="logo">
				<h1>AFRICAN MARKET</h1>
			</div>
			<div className="nav-links">
				<Link to="/" id="homeNavLink">
					Home
				</Link>
				<Link to="/login" id="loginNavLink">
					Login
				</Link>
				<Link to="/signup" id="signupNavLink">
					Sign Up
				</Link>
			</div>
		</nav>
	);
};

export default NavBar;
