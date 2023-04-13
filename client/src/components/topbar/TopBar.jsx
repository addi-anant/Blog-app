import React, { useContext } from "react";
import "./topbar.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

function TopBar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  const PF = "http://localhost:5000/images/";

  return (
    <div className="top">
      <div className="topLeft">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener">
          <i className="topIcon fa-brands fa-square-facebook"></i>
        </a>
        <a href="https://twitter.com/home" target="_blank" rel="noopener">
          <i className="topIcon fa-brands fa-square-twitter"></i>
        </a>

        <a href="https://in.pinterest.com/" target="_blank" rel="noopener">
          <i className="topIcon fa-brands fa-square-pinterest"></i>
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener">
          <i className="topIcon fa-brands fa-square-instagram"></i>
        </a>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link to="/" className="link">
              {" "}
              HOME{" "}
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/" className="link">
              {" "}
              ABOUT{" "}
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/" className="link">
              {" "}
              CONTACT{" "}
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/write" className="link">
              {" "}
              WRITE{" "}
            </Link>
          </li>
          <li className="topListItem">
            <Link to="/login" className="link" onClick={handleLogout}>
              {" "}
              {user && "LOGOUT"}{" "}
            </Link>
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img className="topImg" src={PF + user.profilePic} alt="" />
          </Link>
        ) : (
          <ul className="topList">
            <ul className="topListItem">
              <Link to="/login" className="link">
                {" "}
                LOGIN{" "}
              </Link>
            </ul>
            <ul className="topListItem">
              <Link
                to="/register"
                className="link"
                style={{ "padding-left": "0" }}
              >
                {" "}
                REGISTER{" "}
              </Link>
            </ul>
          </ul>
        )}

        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
}

export default TopBar;
