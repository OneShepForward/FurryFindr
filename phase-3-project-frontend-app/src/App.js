import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import TinderPile from './TinderPile';
import Header from "./Header";
import UserView from './UserView';
import furryfindr_logo from './furryfindr_logo.png';
import furryfindr_match from './furryfindr_match.png';

function App() {
  // to simulate authentication, change initial_user_id
  const initial_user_id = 1

  const [activeUserID, setActiveUserID] = useState(initial_user_id);
  const [allUserData, setAllUserData] = useState([]);
  const [activeUser, setUser] = useState();
  const [pets, setPets] = useState();
  const [allPets, setAllPets] = useState();
  const [allAgencyData, setAllAgencyData] = useState([]);
  const [currentAgency, setCurrentAgency] = useState();
  const [isRendered, setRendered] = useState(false);
  const [isIntro, setIntro] = useState(true);
  const [isVisible, setVisible] = useState(false);
  const [matchPop, setPopup] = useState(false);

  useEffect(()=> {
    // fetch all pets in the database
    fetch('http://localhost:9292/pets')
    .then((res) => res.json())
    .then(petData => {setAllPets(petData)
    })
    // set the pets to only show pets that have not been matched to user
    fetch(`http://localhost:9292/pets/not/${initial_user_id}`)
    .then((res) => res.json())
    .then(petData => setPets(petData))
    // fetch all of the user data in the database and make the first one active
    fetch('http://localhost:9292/users')
    .then(res => res.json())
    .then(userData => {
      setAllUserData(userData);
      // sets active user ID by their index
      setActiveUserID(userData[(initial_user_id - 1)].id)
    })
    // fetch agency data and then isRendered = true
    fetch('http://localhost:9292/agencies')
    .then(res => res.json())
    .then(agencyData => setAllAgencyData(agencyData))
    .then(setRendered(true))

    // this makes the logo appear when loading
    setVisible(true);

    const timer = setTimeout(() => {
        setIntro(false);
    }, 2500);

  //cleanup function 
  return function cleanup() {
      console.log("Running cleanup");
      // ✅ clear the interval so state is no longer updated
      clearInterval(timer);
      };
  }, [])

    // filter by agency or return to all cities
  const handleAgencyClicked = (agency) => {
    if (agency === "All") {
      fetch(`http://localhost:9292/pets/not/${initial_user_id}`)
      .then((res) => res.json())
      .then(petData => setPets(petData))
      setCurrentAgency()
    } else {
      console.log("App says agency: ", agency);
      console.log("All pets: ", allPets)
      setPets(allPets)
      setCurrentAgency()
      setCurrentAgency(agency);
      setPets(pets.filter(pet => pet.agency_id === agency.id))
    }
  }
  
  const handleUserClicked = (user) => {
    console.log("Current user is now: ", user)  
    fetch(`http://localhost:9292/pets/${user.id}`)
    .then (res => res.json())
    .then(retrievedPets => {
      setPets(retrievedPets)
      setUser(user)
    })
  }

  const handleDeleteClicked = (the_user) => {
    handleUserClicked(the_user)
  }

  const handleLetsMatchClick = () => {
    setUser()
  }

  const handleMatched = () => {
      setPopup(true);
      setTimeout(() => {
        setPopup(false);
    }, 1000);
  }

  let currentView;
  function viewChanger () {
  if (activeUser) {
    currentView = <UserView
                  activeUser = {activeUser}
                  pets = {pets}
                  handleDelete = {handleDeleteClicked}
                />}
    else {
    currentView = <div>
      <h1 style={{marginTop: "-25px"}}>Match with some fabulous pets!</h1>
      <TinderPile 
        pets = {pets}
        userID = {activeUserID}
        allAgencyData = {allAgencyData}
        handleMatched = {handleMatched}
      />
      <div style={{position: "absolute"}}>
        <img 
        src={furryfindr_match} 
        alt="It's a match! popup"
        className={`pop-up ${matchPop ? 'is-popping' : ''}`}/>
      </div>
    </div> }
  } 

  
viewChanger();

if (isIntro) {
  return (
    <div className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}>      
      <img src={furryfindr_logo}/>
    </div>
  )
}  
else {
return (

    <div className="App">
      <Header
        isRendered = {isRendered}
        allUserData = {allUserData}
        activeUser = {activeUser}
        allAgencyData = {allAgencyData}
        currentAgency = {currentAgency}
        handleUserClicked = {handleUserClicked}
        handleAgencyClicked = {handleAgencyClicked}
        handleLetsMatchClick = {handleLetsMatchClick}
      />

      {/* Displays either User Matches or Tinder Pile */}
      {currentView}

    </div>

  );
}
}

export default App;