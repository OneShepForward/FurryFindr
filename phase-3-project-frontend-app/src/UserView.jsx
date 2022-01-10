import React, {useState, useEffect} from "react";
import UserMatch from "./UserMatch";

function UserView( { activeUser, pets } ) {
    // const [petList, setPetList] = useState()
    // console.log("UserView says the Active user is:", user)

    // useEffect(()=> {
    //     fetch(`/pets/${activeUser.id}`)
    //     .then(res => res.json())
    //     .then(petsToRender => setPetList(petsToRender))
    //   }, [])

//    const renderMatches = pets.map((pet) => {
//        return <div
//             key = {pet.id}
//             className="listedPet"
//        >
//         {pet.name}
//        </div>
//    });
console.log(pets)

   function renderMatches () { 
       return pets.map((pet) => {
        return <UserMatch
            key = {pet.id}
            pet = {pet}
            className="listedPet"
        >
       </UserMatch>
   })
}

//    const renderMatches = allUserData.map((user) => {
//         return <div
//             key={user.id} 
//             className={setUserClassName(user.id)}
//             onClick={() => userClicked(user)}
//         >
//         {user.name}
//     </div>        
// });
   
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