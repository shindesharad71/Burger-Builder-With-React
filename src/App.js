import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';
import Person from './Person/Person';

const StyledButton = styled.button`
	background-color: ${props => props.alt ? 'red' : 'green'};
	color: white;
	border: 1px sold blue;
	padding: 8px;
	cursor: pointer;

	&:hover {
		background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
		color: black;
	}
`;

class App extends Component {
	state = {
		persons: [
			{ name: 'Sharad', age: 26 },
			{ name: 'Avi', age: 28 },
			{ name: 'Jabya', age: 24 },
		],
		showPersons: false,
	};

	nameChangedHandler = (event, index) => {
		const persons = [...this.state.persons];
		persons[index].name = event.target.value;
		this.setState({ persons });
	};

	deletePersonHandler = (index) => {
		const persons = [...this.state.persons];
		persons.splice(index, 1);
		this.setState({ persons });
	};

	togglePersonsHandler = () => {
		this.setState({ showPersons: !this.state.showPersons });
	};

	render() {
		let persons = null;

		if (this.state.showPersons) {
			persons = (
				<div>
					{this.state.persons.map((person, i) => (
						<Person
							name={person.name}
							age={person.age}
							key={i}
							changed={(event) =>
								this.nameChangedHandler(event, i)
							}
							clicked={() => this.deletePersonHandler(i)}
						/>
					))}
				</div>
			);
		}

		return (
			<div className="App">
				<h1>This is React App</h1>
				<StyledButton alt={this.state.showPersons} onClick={this.togglePersonsHandler}>
					Switch Name
				</StyledButton>
				{persons}
			</div>
		);
	}
}

export default App;
