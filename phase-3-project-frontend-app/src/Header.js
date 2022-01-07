import React from 'react';
import { useEffect, useState } from 'react';

// to incorporate styling
import "./Menu.css"; 

function Header( { activeUser, handleUserClicked, allUserData } ) {
    // openMenu will allow for cascade dropdown menu
    const [openMenu, setOpenMenu] = useState(false)

    // num corresponds to .open-# classes
    // is assigned when the Menu is clicked to trigger dropdown
    const setClassName = num => {
        const classArr = ["m-item"];
        if (openMenu) classArr.push(`open-${num}`)
        return classArr.join(' ')
    }

    // sets User and closes Menu
    const userClicked = user => {
        // console.log(user)
        handleUserClicked(user)
        setOpenMenu(!openMenu)
    }
    
    // const renderUsers = allUserData.map((user) => (
    //     <div style={{top: (1.8*user.id)em}}
    //         onClick={() => userClicked(user)}>
    //             {user.name}
    //     </div>        
    // ));

    const renderUsers = allUserData.map((user) => (
        <div 
            className={setClassName(user.id)}
            onClick={() => userClicked(user)}>
            {user.name}
        </div>        
    ));



  return (
    <div className="nav-bar">
        <h1 className="active-user">
        Welcome to FurryFindr, {activeUser.name}
        </h1>
        {/* This renders all of the user selections */}
        <div className="Menu">
            <div className={"m-item m-logo"}
                onClick={() => setOpenMenu(!openMenu)}>
                User Login
            </div>
            {renderUsers}
        </div>
    </div>    
  );
}

export default Header;