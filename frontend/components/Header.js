import Link from 'next/link'
import Router from 'next/router'
import React, {useState} from 'react'

import { logout, isAuth } from '../actions/auth'

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
                { !isAuth() && (
                  <React.Fragment>
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
                  </React.Fragment>
                ) }
                { isAuth() && (
                  <React.Fragment>
                    <NavItem>
                        <NavLink style={{cursor: 'pointer'}} onClick={() => {
                            if(isAuth() && isAuth().role === 1) {
                              Router.replace('/admin')
                            } else {
                              Router.replace('/user')
                            }
                          }}>{ `${isAuth().name}` }'s Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink style={{cursor: 'pointer'}} onClick={() => logout(()=>{ Router.replace('/login') })}>Logout</NavLink>
                    </NavItem>
                  </React.Fragment>
                  ) 
                }

              </Nav>
            </Collapse>
          </Navbar>
        </div>
      ); 
}

export default Header
