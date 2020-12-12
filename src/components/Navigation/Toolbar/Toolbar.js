import React from 'react';
import classes from './Toolbar.module.scss';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) => (
	<header className={classes.Toolbar}>
		<div className={classes.DrawerToggle} onClick={props.toggle}>
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div className={classes.Logo}><Logo/></div>
		<nav className={classes.DesktopOnly}>
			<NavigationItems isAuthenticated={props.isAuth} />
		</nav>
	</header>
);

export default toolbar;
