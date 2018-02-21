import React from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink
} from 'reactstrap';
import './Header.css';

class Header extends React.Component {
  state = {
    isOpen: false
  };
  handleToggle = () => {
    this.setState(({ isOpen }) => ({ isOpen: !isOpen }));
  };

  render() {
    return (
      <Navbar fixed="top" dark expand="lg" className="navbar-custom">
        <div className="container">
          <NavbarBrand href="/">Conconi Analyzer</NavbarBrand>
          <NavbarToggler onClick={this.handleToggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">Upload</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Contact</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default Header;
