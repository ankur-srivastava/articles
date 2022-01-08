import Link from 'next/link'
import React, {useState} from 'react'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { APP_NAME } from '../config';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    function toggle() {
        setIsOpen(!isOpen)
    }

    return (
        <div>
          <Navbar color="light" light expand="md">
            <Link href="/">
              <NavbarBrand className='font-weight-bold'>{ APP_NAME }</NavbarBrand>
            </Link>
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
              <Nav className="ms-auto" navbar>
                <NavItem>
                    <Link href="/login">
                      <NavLink>Login</NavLink>
                    </Link>
                </NavItem>
                <NavItem>
                    <Link href="/signup">
                      <NavLink>Signup</NavLink>
                    </Link>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
        </div>
      ); 
}

export default Header
