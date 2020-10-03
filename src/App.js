import React from 'react';
import './App.css';
import Person from './Person/Person';

function App() {
	return (
		<div className="App">
      <h1>This is React App</h1>
      <Person name="Sharad" age="26"/>
      <Person name="Avi" age="28">Hobbies: Watching Anime</Person>
      <Person name="Jabya" age="24"/>
		</div>
	);
}

export default App;
