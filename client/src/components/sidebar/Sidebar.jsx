import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "./sidebar.css";
import axios from "axios";
import { Link } from "react-router-dom";

function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get("/categories");
      setCats(res.data);
    };

    getCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle"> Explore </span>
        <img
          src="https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt=""
        />
        <p>Exploring the Unknown requires tolerating the Uncertainity.</p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle"> CATEGORIES </span>
        <ul className="sidebarList">
          {cats.map((c) => (
            <Link to={`/?cat=${c.name}`} className="link">
              <li className="sidebarListItem"> {c.name} </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle"> FOLLOW US </span>
        <div className="sidebarSocial">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener">
            <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          </a>
          <a href="https://twitter.com/home" target="_blank" rel="noopener">
            <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          </a>

          <a href="https://in.pinterest.com/" target="_blank" rel="noopener">
            <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener">
            <i className="sidebarIcon fa-brands fa-square-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
