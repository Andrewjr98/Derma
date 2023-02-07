import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="">
      <div className="">
        <div>
          <Link to="/">
            <h1>Derma:</h1>
          </Link>
          <p>Your Skin. Your Choice.</p>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link to={`/profiles/${Auth.getProfile().data.username}`}>
                {Auth.getProfile().data.username}'s Profile
              </Link>
              <button className="" onClick={logout}></button>
            </>
          ) : (
            <>
              <Link className="" to="/login">
                login
              </Link>
              <Link className="" to="/signup">
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
