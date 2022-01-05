import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import TinderPile from './TinderPile';

function App() {
  const [pets, setPets] = useState();

  function getPets() {
    fetch('http://localhost:9292/pets')
    .then(res => res.json)
    .then(data => setPets(data))
  }

  return (
    <div className="App">
      <h1>Match with some fabulous pets!</h1>
      <TinderPile 
        pets = {pets}
      />
    </div>
  );
}

export default App;
