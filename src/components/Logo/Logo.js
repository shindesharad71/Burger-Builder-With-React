import React from 'react';
import classes from './Logo.module.scss'
import burgerLogo from '../../assets/images/burger-logo.png';

const logo = () => (
	<div className={classes.Logo}>
		<img src={burgerLogo} alt="logo" />
	</div>
);

export default logo;
