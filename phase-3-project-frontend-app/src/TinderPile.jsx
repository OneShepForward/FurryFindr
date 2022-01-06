import React, {useState} from "react";
import TinderCard from 'react-tinder-card'

function TinderPile({pets}) {
    // const [lastDirection, setLastDirection] = useState();

    const swiped = (direction, name) => {
        console.log(direction)
        if (direction === "right") {
            createMatch(name)
        } else {
            noMatch()
        }
        // setLastDirection(direction)
    }

    function createMatch(name) {
        console.log(`${name} added to matches!`)
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
                onSwipe={(dir) => swiped(dir, pet.name)} 
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