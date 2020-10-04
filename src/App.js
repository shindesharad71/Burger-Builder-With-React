import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
	state = {
		persons: [
			{ name: 'Sharad', age: 26 },
			{ name: 'Avi', age: 28 },
			{ name: 'Jabya', age: 24 },
		],
		showPersons: false,
	};

	switchNameHandler = () => {
		this.setState({
			persons: [
				{ name: 'Sharad Shinde', age: 26 },
				{ name: 'Avinash Mali', age: 28 },
				{ name: 'Aditya Madole', age: 24 },
			],
		});
	};

	nameChangedHandler = (event) => {
		this.setState({
			persons: [
				{ name: event.target.value, age: 26 },
				{ name: 'Avinash Mali', age: 28 },
				{ name: 'Aditya Madole', age: 24 },
			],
		});
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
							changed={this.nameChangedHandler}
						/>
					))}
				</div>
			);
		}

		return (
			<div className="App">
				<h1>This is React App</h1>
				<button onClick={this.togglePersonsHandler}>Switch Name</button>
				{persons}
			</div>
		);
	}
}

export default App;
