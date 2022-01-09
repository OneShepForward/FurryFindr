import React, { useReducer } from 'react';
import { useEffect, useState } from 'react';

// to incorporate styling
import "./Menu.css"; 

// function Header( { activeUser, handleUserClicked, allUserData, isRendered } ) {
function Header( { currentAgency, handleUserClicked, allAgencyData, isRendered,
                    activeUser, allUserData, handleAgencyClicked } ) {
    // openMenu will allow for cascade dropdown menu
    const [openMenu, setOpenMenu] = useState(false)
    const [openUserMenu, setOpenUserMenu] = useState(false)

    // num corresponds to .open-# classes
    // is assigned when the Menu is clicked to trigger dropdown
    const setClassName = num => {
        const classArr = ["m-item"];
        if (openMenu) classArr.push(`open-${num}`)
        return classArr.join(' ')
    }

    const setUserClassName = num => {
        const classArr = ["user-item"];
        if (openUserMenu) classArr.push(`user-open-${num}`)
        return classArr.join(' ')
    }

    // sets User and closes Menu
    const agencyClicked = agency => {
        console.log("Agency clicked: ", agency)
        handleAgencyClicked(agency)
        setOpenMenu(!openMenu)
    }
    
    const userClicked = user => {
        console.log("User clicked: ", user)
        handleUserClicked(user)
        setOpenUserMenu(!openUserMenu)
    }

    const renderAgencies = allAgencyData.map((agency) => {
        return <div
            key={agency.id} 
            className={setClassName(agency.id)}
            onClick={() => agencyClicked(agency)}
        >
            {agency.city}
        </div>        
    });

    const renderUsers = allUserData.map((user) => {
        return <div
            key={user.id} 
            className={setUserClassName(user.id)}
            onClick={() => userClicked(user)}
        >
            {user.name}
        </div>        
    });


    if (isRendered) {
    return (
        <div className="nav-bar">
            {currentAgency ? 
            (
            <h1 className="active-user">
            Browsing FurryFindr in {currentAgency.city}
            </h1> 
            ) :
            <h1 className="active-user">
            Welcome to FurryFindr!
            </h1> 
            }
            {/* This renders all of the user selections */}
            <div className="Menu">
                <div className={"m-item m-logo"}
                    onClick={() => setOpenMenu(!openMenu)}>
                    Agencies
                </div>
                {renderAgencies}
                <div
                    className={setClassName(5)}
                    // The "Show All" button shows all pets that have not yet
                    // been swiped out of the stack. It does not repopulate previously
                    // swiped pets.
                    onClick={() => agencyClicked("All")}
                >
                    Show All
                </div>
            </div>
            <div className="UserMenu">
                <div className={"user-item user-logo"}
                    onClick={() => setOpenUserMenu(!openUserMenu)}>
                    Users
                </div>
                {renderUsers}
                <div
                    className={setUserClassName(6)}
                    onClick={() => userClicked("All")}
                >
                    Show All
                </div>
            </div>
        </div>    
    );
    } else {
        return (<p>Loading...</p>)
    }
}

export default Header;