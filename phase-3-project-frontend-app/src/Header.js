import React, { useReducer } from 'react';
import { useEffect, useState } from 'react';

// to incorporate styling
import "./Menu.css"; 

// function Header( { activeUser, handleUserClicked, allUserData, isRendered } ) {
function Header( { currentAgency, handleUserClicked, allAgencyData, isRendered } ) {
    // openMenu will allow for cascade dropdown menu
    const [openMenu, setOpenMenu] = useState(false)

    console.log(allAgencyData);

    // num corresponds to .open-# classes
    // is assigned when the Menu is clicked to trigger dropdown
    const setClassName = num => {
        const classArr = ["m-item"];
        if (openMenu) classArr.push(`open-${num}`)
        return classArr.join(' ')
    }

    // sets User and closes Menu
    const userClicked = agency => {
        console.log(agency)
        handleUserClicked(agency)
        setOpenMenu(!openMenu)
    }

    const renderAgencies = allAgencyData.map((agency) => {
        return <div
            key={agency.id} 
            className={setClassName(agency.id)}
            onClick={() => userClicked(agency)}
        >
            {agency.city}
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
            </div>
        </div>    
    );
    } else {
        return (<p>Loading...</p>)
    }
}

export default Header;