import React from 'react';
import styled from 'styled-components';

const person = (props) => {
	const StyledDiv = styled.div`
		width: 60%;
		margin: 16px auto;
		border: 1px solid #eee;
		padding: 16px;
		text-align: center;
		box-shadow: 0 2px 3px #ccc;

		@media (min-width: 500px) {
			width: 450px;
		}
	`;

	return (
		<StyledDiv>
			<p onClick={props.clicked}>
				Person Name: {props.name} and Age: {props.age}
			</p>
			<p>{props.children}</p>
			<input type="text" onChange={props.changed} value={props.name} />
		</StyledDiv>
	);
};

export default person;
