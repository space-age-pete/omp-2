import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  InputGroup,
  InputGroupAddon,
  Container
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
          {/* <Container> */}
          <NavbarBrand href="/">Open Mic Project</NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <InputGroup>
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append">
                  <Button color="light">Q</Button>
                </InputGroupAddon>
              </InputGroup>
            </NavItem>
          </Nav>
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
              {/* <UncontrolledDropdown nav inNavbar>
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
                </UncontrolledDropdown> */}
            </Nav>
          </Collapse>
          {/* </Container> */}
        </Navbar>
      </div>
    );
  }
}
