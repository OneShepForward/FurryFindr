import React, {useState, useEffect} from "react";
import UserMatch from "./UserMatch";

function UserView( { activeUser, pets, handleDelete } ) {

// console.log(pets)

   function renderMatches () { 
       return pets.map((pet) => {
        return <UserMatch
            key = {pet.id}
            pet = {pet}
            activeUser = {activeUser}
            className="listedPet"
            handleDelete = {handleDelete}
        >
       </UserMatch>
   })
}
   
    return (
        <div className='user-view'>
            <h1>{activeUser.name}'s Matched Pets</h1> 
            {/* check that pets has been defined */}
            {pets ? 
                // check that there is at least one match
                pets.length > 0 ? 
                    (
                    renderMatches()
                    )
                    :
                    (
                    <h2>"No matches yet. Find a furry friend!"</h2>
                    )
            :
                "Loading..."
            }  
        </div>
    );
}

export default UserView