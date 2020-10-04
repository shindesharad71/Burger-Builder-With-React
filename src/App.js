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
					<Person
						name={this.state.persons[0].name}
						age={this.state.persons[0].age}
						changed={this.nameChangedHandler}
					/>
					<Person
						name={this.state.persons[1].name}
						age={this.state.persons[1].age}
					>
						Hobbies: Watching Anime
					</Person>
					<Person
						name={this.state.persons[2].name}
						age={this.state.persons[2].age}
					/>
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
