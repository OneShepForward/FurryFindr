import React from "react";
import TinderCard from 'react-tinder-card'

function TinderPile( { pets, userID, allAgencyData, handleMatched } ) {

    const swiped = (direction, pet) => {
        console.log(direction)
        if (direction === "right") {
            createMatch(pet)
        } else {
            noMatch()
        }
    }

    function createMatch(pet) {
        console.log(`${pet.name} added to matches!`)
        fetch('http://localhost:9292/matches', {
            method: `POST`,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: userID,
                pet_id: pet.id
            })
        })
        .then((r) => r.json())
        .then (handleMatched())
    }

    function noMatch() {
        console.log("No match here!")
    }

    const outOfFrame = () => {
        console.log(' eft the screen!')
    }

    function get_agency_of_pet (agency_id) {
        switch (agency_id) {
            case allAgencyData[0].id:
                return `${allAgencyData[0].city}`
                break;
            case allAgencyData[1].id:
                return `${allAgencyData[1].city}`
                break;
            case allAgencyData[2].id:
                return `${allAgencyData[2].city}`
                break;
            case allAgencyData[3].id:
                return `${allAgencyData[3].city}`
        }
    }

    return (
        <div className='cardContainer'>
            {pets ? pets.map((pet) =>
                <TinderCard 
                className='swipe' 
                key={pet.id} 
                onSwipe={(dir) => swiped(dir, pet)} 
                onCardLeftScreen={() => outOfFrame(pet.name)}>
                    <div style={{ backgroundImage: 'url(' + pet.photo + ')' }} className='card'>
                        <h3>{pet.name}</h3>
                        <h2>{get_agency_of_pet(pet.agency_id)}</h2>
                        <h2>{pet.age} years old</h2>
                        <h2>{pet.bio}</h2>
                    </div>
                </TinderCard>
            )
            : 
                "Loading..."
            }
        </div>
    )
}

export default TinderPile