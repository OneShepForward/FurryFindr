import React from "react";

function UserMatch( { pet, handleDelete, activeUser }) {
  
console.log(activeUser)

  function deleteClicked(pet) {
    console.log("Delete:", pet.name, activeUser)
    fetch(`http://localhost:9292/matches/delete/${pet.id}/${activeUser.id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(() => handleDelete(activeUser, pet))
    console.log("clicked", pet.id, activeUser.id)
    }
  
    const truncate = (str) => str.length > 60 ? str.substring(0,60) + "..." : str;
  
  return (
    <div className="user-match-card">
      <div class="top-section">
        <span className="image">
          <img 
          src={pet.photo} 
          className="user-match-image"
          alt={`cute picture of ${pet.name}`}
          />
        </span>
        <div className="user-match-name">{pet.name}</div>
        <span className="age">Age: {pet.age}</span>
        <div style = {{overflow: 'hidden', textOverflow: 'ellipsis'}}>Mantra: "{truncate(pet.bio)}"</div>
      </div>
      <button 
        className="emoji-button delete"
        onClick={() => deleteClicked(pet)}>❌
          <span style={{fontSize: "14px", marginTop: "auto"}}> Delete Match </span>
      </button>
    </div>
  );
}

export default UserMatch;