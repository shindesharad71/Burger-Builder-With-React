import React from 'react';
import './Person.css';

const person = (props) => {
	return (
		<div className="Person">
			<p>
				Person Name: {props.name} and Age: {props.age}
            </p>
			<p>{props.children}</p>
			<input type="text" onChange={props.changed} value={props.name} />
		</div>
	);
};

export default person;
