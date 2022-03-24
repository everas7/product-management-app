import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Login from "../components/Login/Login";
import styles from "./AccessPage.module.scss";

export default function AccessPage() {
  return (
    <div className={styles["access-page"]}>
      <div className={styles["access-page__image"]} />

      <div className={styles["access-page__page"]}>
        <Container className="h-100">
          <Row className="h-100 justify-content-center align-items-center">
            <Col md="6">
              <Login />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
