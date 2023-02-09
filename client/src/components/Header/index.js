import React from "react";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";
import { Menu, Button } from "semantic-ui-react";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Menu>
    <Menu.Item to="/">
      <Link className="" to="/">
        DERMA
      </Link>
    </Menu.Item>
    <Menu.Menu position="right">
      {Auth.loggedIn() ? (
        <>
          <Link className="btn btn-sm btn-info m-2" to="/me">
            {Auth.getProfile().data.username}
          </Link>
          <Button className="btn btn-lg btn-light m-2" onClick={logout}>
            Logout
          </Button>
        </>
      ) : (
        <>
          <Menu.Item>
            <Button color="blue">
              <Link className="text-light" to="/login">
                Login
              </Link>
            </Button>
          </Menu.Item>
          <Menu.Item>
            <Button>
              <Link to="/signup">Create Account</Link>
            </Button>
          </Menu.Item>
        </>
      )}
    </Menu.Menu>
  </Menu>
);
};

export default Header;
