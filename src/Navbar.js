import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "./images/Logo.png";
//import { IoMdReorder } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiUser } from "react-icons/fi";
const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div className="navcontainer">
      <div className="navcontainerleft">
        <img src={img} alt="CC" />
        <h2>Crossland Crafts</h2>
      </div>
      <div className="navcontaineright" id={showLinks ? "rowmenu" : ""}>
        <Link
          to="/"
          className="navcontainerightlink"
          onClick={() => setShowLinks(!showLinks)}
        >
          Home
        </Link>
        <Link
          to="/input"
          className="navcontainerightlink"
          onClick={() => setShowLinks(!showLinks)}
        >
          Input
        </Link>
        <Link
          to="/terracotta"
          className="navcontainerightlink"
          onClick={() => setShowLinks(!showLinks)}
        >
          Terracotta
        </Link>
        <Link
          to="/chopping_board"
          className="navcontainerightlink"
          onClick={() => setShowLinks(!showLinks)}
        >
          ChoppingBoard
        </Link>
        <Link
          to="/furniture"
          className="navcontainerightlink"
          onClick={() => setShowLinks(!showLinks)}
        >
          Furniture
        </Link>
        <Link
          to="/login"
          className="navcontainerightlink"
          onClick={() => setShowLinks(!showLinks)}
        >
          Login
        </Link>
        <FiUser className="user" />
      </div>
      {showLinks ? (
        <GrClose
          className="navcontainerightlinkbuttons"
          onClick={() => setShowLinks(!showLinks)}
        />
      ) : (
        <GiHamburgerMenu
          className="navcontainerightlinkbuttons"
          id="hamburger"
          onClick={() => setShowLinks(!showLinks)}
        />
      )}

      <FiUser className="navcontainerightlinkbuttons" />
    </div>
  );
};
export default Navbar;
// {showLinks ? (
//   <GrClose
//     className="link-button"
//     onClick={() => setShowLinks(!showLinks)}
//   />
// ) : (
//   <GiHamburgerMenu
//     className="link-button"
//     onClick={() => setShowLinks(!showLinks)}
//   />
// )}
