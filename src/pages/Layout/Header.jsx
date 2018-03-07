import React from 'react';
import {
  Collapse,
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem
} from 'reactstrap';
import './Header.css';
import { inject, observer } from 'mobx-react';
import Link from 'react-scroll/modules/components/Link';

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
              {this.props.menuStore.getItems().map(item => (
                <NavItem key={item.id}>
                  <Link
                    to={item.id}
                    href={`#${item.id}`}
                    className="nav-link"
                    smooth={true}
                    spy={true}
                    offset={-25}
                    duration={700}
                  >
                    {item.label}
                  </Link>
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
