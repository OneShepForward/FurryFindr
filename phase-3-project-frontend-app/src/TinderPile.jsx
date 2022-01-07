import React, {useState} from "react";
import TinderCard from 'react-tinder-card'

function TinderPile( {pets, user} ) {
    // const [lastDirection, setLastDirection] = useState();
    console.log("TinderPile says the Active user is:", user)

    const swiped = (direction, pet, user) => {
        console.log(direction)
        if (direction === "right") {
            createMatch(pet, user)
        } else {
            noMatch()
        }
        // setLastDirection(direction)
    }

    function createMatch(pet, currentUser) {
        console.log(`${pet.name} added to matches!`)
        console.log("line 20", currentUser)
        // fetch('http://localhost:9292/matches', {
        //     method: `POST`,
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({
        //         user_id: `${user}`,
        //         pet_id: `${pet.id}`
        //     })
        // })
        // .then((r) => r.json())
        // .then (console.log(`Success! ${user.id} matched with ${pet.id}!`))
    }

    function noMatch() {
        console.log("No match here!")
    }


    const outOfFrame = () => {
        console.log(' left the screen!')
    }

    return (
        <div className='cardContainer'>
            {pets ? pets.map((pet) =>
                <TinderCard 
                className='swipe' key={pet.id} 
                onSwipe={(dir) => swiped(dir, pet, user)} 
                onCardLeftScreen={() => outOfFrame(pet.name)}>
                    <div style={{ backgroundImage: 'url(' + pet.photo + ')' }} className='card'>
                        <h3>{pet.name}</h3>
                        <h2>{pet.age} {pet.bio}</h2>
                    </div>
                </TinderCard>
            ): "loading"}
        </div>
    )
}

export default TinderPile