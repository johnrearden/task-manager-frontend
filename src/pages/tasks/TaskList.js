import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import appStyles from "../../App.module.css";
import styles from "../../styles/TaskList.module.css";
import Task from "./Task";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";


function TaskList({ message, filter = "" }) {
  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/?${filter}`);
        setTasks(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchTasks();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Recently updated tasks on mobile</p>
        {hasLoaded ? (
          <>
            {tasks.results.length ? (
              tasks.results.map((task) => (
                <Task key={task.id} {...task} setTasks={setTasks} />
              ))
            ) : (
              <Container className={appStyles.Content}>
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className={appStyles.Content}>
            <Asset spinner />
          </Container>
        )}      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Recently updated tasks on desktop</p>
      </Col>
    </Row>
  );
}

export default TaskList;