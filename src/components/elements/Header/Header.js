import React from "react";
import { Link } from "react-router-dom";
// import './Header.css';

import ForumPage from '../../Forum/ForumPage';

const Header = () => (
  <div>
    <nav class="navbar navbar-expand-md bg-dark navbar-dark fixed-top">
      <ul class="navbar-nav">
        <li class="nav-item">
        <a class="navbar-brand" href="./">
        <img src="/images/logo3.png" alt="Logo" style={{ width: "80px" }} />
      </a>

        </li>
        <li class="nav-item">
          <a class="nav-link" href="/ForumPage" >
            Forum
          </a>
        </li>
      </ul>
    </nav>
  </div>
);

export default Header;
