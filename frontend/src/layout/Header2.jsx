import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "font-awesome/css/font-awesome.min.css";
import "../script/custom.js";
import "../css/header2.css";
import "../script/custom.js";
import "../css/variables.css";
import "../css/total.css";

function Header2() {
	
	return (
		<div>
  <header className="header2">
    <div className="header2-container">
      <a href="/" class="move-to-main">
        <img src={require('../images/header2-logo.png')} alt=""></img>
      </a>
      <div className="logout-container">
        <i className="fa fa-lock" aria-hidden="true"></i>
        <a href="">로그아웃</a>
      </div>
    </div>
  </header>
		</div>
	);
}

export default Header2;
