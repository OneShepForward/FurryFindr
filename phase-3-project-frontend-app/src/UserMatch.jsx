import React, { useState } from "react";

function UserMatch( { pet }) {
  
  const [favoriteStatus, favoriteSetter] = useState(false);


  function toggleFavorite() {
    favoriteSetter(!favoriteStatus);
  }

  function handleDeleteClick() {
    // console.log("Delete:", listing)
    fetch(`http://localhost:6001/listings/${pet.id}`, {
      method: "DELETE"
    })
    .then(resp => resp.json())
    .then(() => console.log("clicked"))

  }
  
  
  return (
    <div className="user-match-card">
      <span className="image">
        <img 
        src={pet.photo} 
        className="user-match-image"
        alt="cute picture of a pet"
        />
      </span>
          {/* <span style={{position: "relative", top: 0}}>{pet.name}</span> */}
          <div className="user-match-name">{pet.name}</div>
        <span className="age">Age: {pet.age}</span>
      <div className="details">
        {/* {favoriteStatus ? (
          <button 
          className="emoji-button favorite active"
          onClick={toggleFavorite}
          >★</button>
        ) : (
          <button 
          className="emoji-button favorite"
          onClick={toggleFavorite}
          >☆</button>
        )} */}
        <div>Mantra: "{pet.bio}"</div>
        <button 
            className="emoji-button delete"
            onClick={handleDeleteClick}>❌
            <span style={{fontSize: "14px", marginTop: "auto"}}> Delete Match </span>
        </button>
      </div>
    </div>
  );
}

export default UserMatch;