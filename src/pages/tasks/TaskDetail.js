import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import Container from "react-bootstrap/Container";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

// import appStyles from "../../App.module.css";
import Task from "./Task";

function TaskDetail() {
    const { id } = useParams();
    const [task, setTask] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
          try {
            const [{ data: task }] = await Promise.all([
              axiosReq.get(`/tasks/${id}`),
            ]);
            setTask({ results: [task] });
            console.log(task);
          } catch (err) {
            console.log(err);
          }
        };
    
        handleMount();
      }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Recently updated tasks for mobile</p>
        <Task {...task.results[0]} setTasks={setTask} taskDetail/>
        {/* <Container className={appStyles.Content}>
          Comments
        </Container> */}
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Recently updated tasks for desktop
      </Col>
    </Row>
  );
}

export default TaskDetail;