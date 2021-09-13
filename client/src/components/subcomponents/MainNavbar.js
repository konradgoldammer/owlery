import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import store from "../../store";
import { logout } from "../../actions/authActions";

const MainNavbar = () => {
  const auth = useSelector((state) => state.auth);

  const [searchInput, setSearchInput] = useState("");

  const changeSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md" className="px-4">
        <NavbarBrand href="/" className="navbar-brand text-lowercase">
          Owlery
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/podcasts" className="text-uppercase navbar-link">
                <strong>Podcasts</strong>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/lists" className="text-uppercase navbar-link">
                <strong>Lists</strong>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/members" className="text-uppercase navbar-link">
                <strong>Members</strong>
              </NavLink>
            </NavItem>
          </Nav>

          {auth.isAuthenticated ? (
            <UncontrolledDropdown
              nav
              inNavbar
              className="d-flex flex-row-reverse w-100"
            >
              <DropdownToggle
                nav
                caret
                className="text-uppercase profile-dropdown-toggle"
              >
                <strong>{auth.user.username}</strong>
              </DropdownToggle>
              <DropdownMenu right className="profile-dropdown-menu">
                <DropdownItem className="profile-dropdown-item text-uppercase">
                  <strong>Profile</strong>
                </DropdownItem>
                <DropdownItem className="profile-dropdown-item text-uppercase">
                  <strong>Settings</strong>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem
                  className="profile-dropdown-item text-uppercase"
                  onClick={() => store.dispatch(logout())}
                >
                  <strong>Logout</strong>
                </DropdownItem>{" "}
              </DropdownMenu>
            </UncontrolledDropdown>
          ) : (
            <div className="d-flex flex-row-reverse d-none d-md-flex w-100">
              <Link to="/create-account">
                <button className="btn btn-sm btn-primary text-uppercase">
                  <strong>Create Account</strong>
                </button>
              </Link>
              <Link to="/login">
                <button className="btn btn-sm btn-dark text-uppercase mx-2">
                  <strong>Login</strong>
                </button>
              </Link>
            </div>
          )}
        </Collapse>

        {!isOpen && (
          <div className="input-group searchbar">
            <input
              className="form-control my-0 py-1 searchbar-input"
              type="text"
              placeholder="Search"
              aria-label="Search"
              onChange={changeSearchInput}
            />
            <div>
              <a href="/">
                <span className="input-group-text searchbar-span">
                  <FaSearch className="searchbar-icon"></FaSearch>
                </span>
              </a>
            </div>
          </div>
        )}
      </Navbar>
    </div>
  );
};

export default MainNavbar;
