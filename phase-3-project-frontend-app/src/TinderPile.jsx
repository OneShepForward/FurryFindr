import React from "react";
import TinderCard from 'react-tinder-card'
import CardContent from "./CardContent";


function TinderPile(pets) {
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
            <CardContent 
                            
            />
        </TinderCard>
    )
}

export default TinderPile