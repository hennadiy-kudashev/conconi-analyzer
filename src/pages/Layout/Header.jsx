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
import { inject, observer } from 'mobx-react';

@inject('menuStore')
@observer
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
          <NavbarBrand href="/">Test Conconi</NavbarBrand>
          <NavbarToggler onClick={this.handleToggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/components/">About</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/components/">Upload</NavLink>
              </NavItem>
              {this.props.menuStore.getItems().map(item => (
                <NavItem key={item}>
                  <NavLink href="/components/">{item}</NavLink>
                </NavItem>
              ))}
            </Nav>
          </Collapse>
        </div>
      </Navbar>
    );
  }
}

export default Header;
