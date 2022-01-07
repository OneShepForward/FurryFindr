import React, {useState} from "react";
import TinderCard from 'react-tinder-card'

function TinderPile( { pets, userID } ) {
    // const [lastDirection, setLastDirection] = useState();

    // The TinderPile receives the updated activeUser here...
    // console.log("TinderPile says the Active user is:", user)

    const swiped = (direction, pet) => {
        console.log(direction)
        // ... but the swiped function uses the original one.
        console.log("Swiped says that the Active User is", userID)
        if (direction === "right") {
            createMatch(pet)
        } else {
            noMatch()
        }
        // setLastDirection(direction)
    }

    function createMatch(pet) {
        console.log(`${pet.name} added to matches!`)
        // ... and the fetch does the same as the swiped 
        console.log("createMatch says current user is", userID)
        fetch('http://localhost:9292/matches', {
            method: `POST`,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // If you hard code it like below, it will post with the hard code
                // user_id: 4,

                // Maybe when these Tinder Cards render, they imprint the current
                // value for user?!
                user_id: userID,
                pet_id: pet.id
            })
        })
        .then((r) => r.json())
        .then (console.log(`Success! ${userID} matched with ${pet.id}!`))
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
                className='swipe' 
                // currentUser = {user}
                key={pet.id} 
                onSwipe={(dir) => swiped(dir, pet)} 
                onCardLeftScreen={() => outOfFrame(pet.name)}>
                    <div style={{ backgroundImage: 'url(' + pet.photo + ')' }} className='card'>
                        <h3>{pet.name} - {pet.agency_id}</h3>
                        <h2>{pet.age} {pet.bio}</h2>
                    </div>
                </TinderCard>
            ): "loading"}
        </div>
    )
}

export default TinderPile

// import React, {useState} from "react";
// import TinderCard from 'react-tinder-card'

// function TinderPile( {pets, user} ) {
//     // const [lastDirection, setLastDirection] = useState();
//     console.log(user)

//     const swiped = (direction, pet) => {
//         console.log(direction)
//         if (direction === "right") {
//             createMatch(pet)
//         } else {
//             noMatch()
//         }
//         // setLastDirection(direction)
//     }

//     function createMatch(pet) {
//         console.log(`${pet.name} added to matches!`)
//         fetch('http://localhost:9292/matches', {
//             method: `POST`,
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 user_id: `${user}`,
//                 pet_id: `${pet.id}`
//             })
//         })
//         .then((r) => r.json())
//         .then (console.log("Success!"))
//     }

//     function noMatch() {
//         console.log("No match here!")
//     }


//     const outOfFrame = () => {
//         console.log(' left the screen!')
//     }

//     return (
//         <div className='cardContainer'>
//             {pets ? pets.map((pet) =>
//                 <TinderCard 
//                 className='swipe' key={pet.id} 
//                 onSwipe={(dir) => swiped(dir, pet)} 
//                 onCardLeftScreen={() => outOfFrame(pet.name)}>
//                     <div style={{ backgroundImage: 'url(' + pet.photo + ')' }} className='card'>
//                         <h3>{pet.name}</h3>
//                         <h2>{pet.age} {pet.bio}</h2>
//                     </div>
//                 </TinderCard>
//             ): "loading"}
//         </div>
//     )
// }

// export default TinderPile