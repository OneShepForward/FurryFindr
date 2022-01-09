import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import TinderPile from './TinderPile';
import Header from "./Header";
import UserView from './UserView';
import AgencyView from './AgencyView';

  const sample_user =     
{
  "id": 1,
  "name": "Balgruuf Black-Briar",
  "age": 23,
  "city": "Balmora",
  "bio": "I forgot something.",
  "interested_in": "Any furry friend!",
  "photo": "https://robohash.org/optioetomnis.png?size=300x300&set=set1"
}

function App() {

  const [pets, setPets] = useState();
  const [allPets, setAllPets] = useState();
  const [allAgencyData, setAllAgencyData] = useState([]);
  const [currentAgency, setCurrentAgency] = useState();
  const [allUserData, setAllUserData] = useState([]);
  // const [allUserData, setAllUserData] = useState([]);
  const [activeUserID, setActiveUserID] = useState(1);
  const [activeUser, setUser] = useState(sample_user);
  const [isRendered, setRendered] = useState(false);
  const [viewerState, setViewerState] = useState(null)

  useEffect(()=> {
    fetch('http://localhost:9292/pets')
    .then((res) => res.json())
    .then(petData => {setAllPets(petData)
    })
    fetch('http://localhost:9292/pets/not/1')
    .then((res) => res.json())
    .then(petData => setPets(petData))
    fetch('http://localhost:9292/users')
    .then(res => res.json())
    .then(userData => {
      setAllUserData(userData.slice(0, 5));
      setActiveUserID(userData[0].id)
    })
    fetch('http://localhost:9292/agencies')
    .then(res => res.json())
    .then(agencyData => setAllAgencyData(agencyData))
    .then(setRendered(true))
  }, [])

  const handleAgencyClicked = (agency) => {
    if (agency === "All") {
      setPets(allPets)
      setCurrentAgency()
      setViewerState(null)
    } else {
      console.log("App says agency: ", agency);
      console.log("All pets: ", allPets)
      setViewerState("agency")
      setPets(allPets)
      setCurrentAgency()
      setCurrentAgency(agency);
      setPets(pets.filter(pet => pet.agency_id === agency.id))
    }
  }

  const handleUserClicked = (user) => {
    if (user==="All") {
      setPets(allPets)
      setCurrentAgency()
      setViewerState(null)
    } else {
      console.log("Current user is now: ", user)  
      setUser(user)
      setViewerState("user")
          // passing in the entire user instead of id
      fetch(`http://localhost:9292/pets/${user.id}`)
      .then (res => res.json())
      .then(retrievedPets => setPets(retrievedPets))
    }
  }

  // console.log("Active User is:", activeUser.id)

  const viewContent = () => {
    if (viewerState==="agency") {
      return <AgencyView 
        agency = {currentAgency}
        pets = {pets}
      />
    } else if (viewerState==="user") {
      return <UserView 
        user = {activeUser}
      />
    } else {
      return <TinderPile 
        pets = {pets}
        userID = {activeUserID}
      />
    }
  }

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
      />
      {viewContent()}
    </div>
  );
}

export default App;



//   // I have these as the starting state for activeUser and allUserData
//   const sample_user =     
// {
//   "id": 1,
//   "name": "Balgruuf Black-Briar",
//   "age": 23,
//   "city": "Balmora",
//   "bio": "I forgot something.",
//   "interested_in": "Any furry friend!",
//   "photo": "https://robohash.org/optioetomnis.png?size=300x300&set=set1"
// }

// const sample_user_array = [ 
//   {
//   "id": 1,
//   "name": "Balgruuf Black-Briar",
//   "age": 23,
//   "city": "Balmora",
//   "bio": "I forgot something.",
//   "interested_in": "Any furry friend!",
//   "photo": "https://robohash.org/optioetomnis.png?size=300x300&set=set1"
// },
// {
//   "id": 2,
//   "name": "Festus Newberry",
//   "age": 35,
//   "city": "Morthal",
//   "bio": "Strike the tent.",
//   "interested_in": "Dogs",
//   "photo": "https://robohash.org/aliassapientemolestiae.png?size=300x300&set=set1"
// },
// {
//   "id": 3,
//   "name": "Gerdur The Old",
//   "age": 52,
//   "city": "Whiterun",
//   "bio": "Goodnight, my darlings, I'll see you tomorrow.",
//   "interested_in": "Any furry friend!",
//   "photo": "https://robohash.org/asperioresadipiscidebitis.png?size=300x300&set=set1"
// },]



