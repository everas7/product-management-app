import React from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Col,
  NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import {
  logout,
  selectAuthenticatedUser,
} from "../../../features/access/services/accessSlice";
import { AuthorizedComponent } from "../../authorization/AuthorizedComponent";
import { Permissions } from "../../authorization/permissions";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import styles from "./Navbar.module.scss";

export function Navbar() {
  const user = useAppSelector(selectAuthenticatedUser);
  const dispatch = useAppDispatch();

  return (
    <Col>
      <BootstrapNavbar
        className={styles.navbar}
        collapseOnSelect={true}
        expand="md"
      >
        <BootstrapNavbar.Brand
          className={styles.navbar__brand}
          as={Link}
          to="/"
        >
          Product Management System
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="navbarScroll" />
        <BootstrapNavbar.Collapse id="navbarScroll">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Products
            </Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown
              alignRight={true}
              title={`${user?.name} `}
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item onClick={() => dispatch(logout())}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </Col>
  );
}
