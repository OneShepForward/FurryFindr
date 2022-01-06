import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import TinderPile from './TinderPile';

function App() {
  const [pets, setPets] = useState();
  const [user, setUser] = useState(1);

  useEffect(()=> {
    fetch('http://localhost:9292/pets')
    .then((res) => res.json())
    // .then((data) => console.log(data))
    .then(data => setPets(data))
  }, [])

  // console.log(pets)

  return (
    <div className="App">
      <h1>Match with some fabulous pets!</h1>
      <TinderPile 
        pets = {pets}
        user = {user}
      />
    </div>
  );
}

export default App;
