import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/TaskCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";

function TaskCreateForm() {

  const [errors, setErrors] = useState({});

  const [taskData, setTaskData] = useState({
    title: "",
    excerpt: "",
    description: "",
    assignee: "",
    priority: "",
    status: "",
    dueDate: "",
    image: "",
  });

  const { title, excerpt, description, assignee, priority, status, dueDate, image } = taskData;

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const textFields = (
    <div className="text-center">
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control 
            type="text" 
            placeholder="Title" 
            name="title"
            value={title}
            onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Excerpt</Form.Label>
        <Form.Control
          type="text"
          placeholder="Short summary of the task (optional)"
          name="excerpt"
          value={excerpt}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows="6"
          placeholder="Detailed description of the task"
          name="content"
          value={description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group controlId="assignee">
        <Form.Label>Assigned to</Form.Label>
        <Form.Control 
            as="select" 
            name="assignee" 
            value={assignee}
            onChange={handleChange}
        >
          {/* user list to be retrieved dynamically */}
          <option>none</option>
          <option>user 1</option>
          <option>user 2</option>
        </Form.Control>
      </Form.Group>

      <Form.Group controlId="priority">
        <Form.Label>Priority</Form.Label>
        <Form.Control 
            as="select" 
            name="priority"
            value={priority}
            onChange={handleChange}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </Form.Control>
      </Form.Group>

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => {}}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form>
      <Row>
        <Col md={9} lg={8} className="d-none d-md-block p-0 p-md-2">
          <Container className={appStyles.Content}>{textFields}</Container>
        </Col>

        <Col className="py-2 p-0 p-md-2" md={3} lg={4}>
          <Container
            className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
          >
            <Form.Group controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control 
                as="select" 
                name="status"
                value={status}
                onChange={handleChange}
            >
                <option>To do</option>
                <option>In progress</option>
                <option>Done</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="dueDate">
              <Form.Label>Due date</Form.Label>
              <Form.Control 
                type="date" 
                name="dueDate"
                value={dueDate}
                onChange={handleChange}
            >
              </Form.Control>
            </Form.Group>

            <Form.Group className="text-center">
              <Form.Label
                className="d-flex justify-content-center"
                htmlFor="image-upload"
              >
                <Asset src={Upload} message="Click or tap to upload an image" />
              </Form.Label>
            </Form.Group>
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TaskCreateForm;
