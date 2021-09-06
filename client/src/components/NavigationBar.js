import { Navbar, Nav } from 'rsuite';
import React, { useState } from 'react';
import 'rsuite/dist/styles/rsuite-default.css';
import './css/style.css';

function NavigationBar() {
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }
    return (
        <div>
            <Navbar className="nav-bg">
                <Navbar.Body>
                    <Nav>
                        <Nav.Item>OWLERY</Nav.Item>
                        <Nav.Item>PODCASTS</Nav.Item>
                        <Nav.Item>LISTS</Nav.Item>
                        <Nav.Item>MEMBERS</Nav.Item>
                        <input
                            className="search-bar"
                            type="text"
                            placeholder="Search for Podcasts, Creators, Lists, Users..."
                            onChange={handleChange}
                            value={searchInput} />

                        <button className="login">LOGIN</button>
                        <button className="create-acc">CREATE ACCOUNT </button>
                    </Nav>
                </Navbar.Body>
            </Navbar>
        </div>
    )
}

export default NavigationBar