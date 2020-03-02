import React from 'react';
import './Header.css';

const Header = () =>{
    return(
        <div className = "rmdb-header">
            <div className = "rmdb-header-content">
                <img className = "rmdb-logo" src = "./images/reactMovie_logo.png" alt="rmdb_logo"/>
                <img className = "rmdb-tmdb-logo" src = "./images/tmdb_logo.png" alt ="rmdb_logo"/>
            </div>
        </div>
    )
}

export default Header;