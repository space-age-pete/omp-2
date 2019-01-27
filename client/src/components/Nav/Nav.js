import React from "react";
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
  DropdownItem
} from "reactstrap";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar dark expand="md">
          <NavbarBrand href="/">Open Mic Project</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {!this.props.loggedIn && (
                <NavItem>
                  <NavLink href="/signup">Sign Up</NavLink>
                </NavItem>
              )}
              {!this.props.loggedIn ? (
                <NavItem>
                  <NavLink href="/login">Log In</NavLink>
                </NavItem>
              ) : (
                <NavItem>
                  <NavLink href="#" onClick={this.props.logout}>
                    Log Out
                  </NavLink>
                </NavItem>
              )}
              <NavItem>
                <NavLink href="/newmic">Add a Mic</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>My Profile</DropdownItem>
                  <DropdownItem onClick={this.props.logout}>
                    Log Out
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
