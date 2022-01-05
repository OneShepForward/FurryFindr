import React from "react";
import TinderCard from 'react-tinder-card'


function TinderPile() {
    const onSwipe = (direction) => {
        console.log('You swiped: ' + direction)
    }
      
    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    return (
        <TinderCard 
            onSwipe={onSwipe} 
            onCardLeftScreen={() => onCardLeftScreen('fooBar')} 
            preventSwipe={['right', 'left']}
            className="card"
        >
            <p>Hello, world!</p>
        </TinderCard>
    )
}

export default TinderPile