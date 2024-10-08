import React from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";

import { Link } from "react-router-dom";

import styles from "../../styles/Landing.module.css";
import signupStyles from "../../styles/SignInUpForm.module.css";
import appStyles from "../../App.module.css";


function Landing() {
  return (
    <Row
      className={`
        ${signupStyles.Row}
        ${signupStyles.Swirl}
        justify-content-center
    `}
    >
      <Col className="my-auto p-0 p-md-2" md={6}>
        <Container
          className={`
            ${appStyles.Content} 
            ${appStyles.LittleRounded} 
            p-4 `}
        >
          <h1 className={signupStyles.Header}>Welcome!</h1>
          <p>The cheerful task manager helps you keep track of your tasks, 
            see how your teammates are getting on, and feel energized in the process!
          </p>
        </Container>
        <Container
          className={`mt-3 text-center
          ${appStyles.Content}
          ${appStyles.LittleRounded}
          `}
        >
          <Link to="/signin" className={styles.TextLink}>
            <span>Sign in</span>
          </Link>
          <span> or </span>
          <Link to="/signup" className={styles.TextLink}>
            <span>Sign up</span>
          </Link>
          <span> to use the app </span>
        </Container>
      </Col>
      {/* <Col
        md={6}
        className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
      >
        <Image
          className={`${appStyles.FillerImage}`}
          src={door}
        />
      </Col> */}
    </Row>
  );
}

export default Landing;
