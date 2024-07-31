import React, { useRef, useState, useEffect } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import Upload from "../../assets/upload.png";

import styles from "../../styles/TaskCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import Asset from "../../components/Asset";
import Image from "react-bootstrap/Image";

function TaskCreateForm() {
  const [errors, setErrors] = useState({});
  const [profiles, setProfiles] = useState({});

  // fetch all profiles from API (based on handleMount in CurrentUserContext)
  const fetchProfiles = async () => {
    try {
      const { data } = await axiosReq.get(`/profiles/`);
      setProfiles(data.results);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  console.log("profiles", profiles);

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

  const {
    title,
    excerpt,
    description,
    assignee,
    priority,
    status,
    dueDate,
    image,
  } = taskData;

  const imageInput = useRef(null);
  const history = useHistory();

  const handleChangeImage = (event) => {
    if (event.target.files.length) {
      URL.revokeObjectURL(image);
      setTaskData({
        ...taskData,
        image: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const handleChange = (event) => {
    setTaskData({
      ...taskData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("title", title);
    formData.append("excerpt", excerpt);
    formData.append("description", description);
    formData.append("assignee", assignee);
    formData.append("priority", priority);
    formData.append("status", status);
    formData.append("dueDate", dueDate);
    formData.append("image", imageInput.current.files[0]);

    try {
      const { data } = await axiosReq.post("/tasks/", formData);
      history.push(`/tasks/${data.id}`);
    } catch (err) {
      console.log(err);
      if (err.response?.status !== 401) {
        setErrors(err.response?.data);
      }
    }
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
      {errors?.title?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

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
      {errors?.excerpt?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

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
      {errors?.description?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="assignee">
        <Form.Label>Assigned to</Form.Label>
        <Form.Control
          as="select"
          name="assignee"
          value={assignee}
          onChange={handleChange}
        >
          {/* user list retrieved dynamically */}
          <option>none</option>
          {profiles.length && (
            <>
              {profiles.map((profile) => {
                return <option>{profile.owner}</option>;
              })}
            </>
          )}
        </Form.Control>
      </Form.Group>
      {errors?.assignee?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Form.Group controlId="priority">
        <Form.Label>Priority</Form.Label>
        <Form.Control
          as="select"
          name="priority"
          value={priority}
          onChange={handleChange}
        >
          {/* value props have to match PRIORITY_OPTIONS in task/models.py */}
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </Form.Control>
      </Form.Group>
      {errors?.priority?.map((message, idx) => (
        <Alert variant="warning" key={idx}>
          {message}
        </Alert>
      ))}

      <Button
        className={`${btnStyles.Button} ${btnStyles.Blue}`}
        onClick={() => history.goBack()}
      >
        cancel
      </Button>
      <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
        create
      </Button>
    </div>
  );

  return (
    <Form onSubmit={handleSubmit}>
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
                {/* value props have to match STATUS_OPTIONS in task/models.py */}
                <option value="TO-DO">To do</option>
                <option value="IN-PROGRESS">In progress</option>
                <option value="DONE">Done</option>
              </Form.Control>
            </Form.Group>
            {errors?.status?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group controlId="dueDate">
              <Form.Label>Due date</Form.Label>
              <Form.Control
                type="date"
                name="dueDate"
                value={dueDate}
                onChange={handleChange}
              ></Form.Control>
            </Form.Group>
            {errors?.dueDate?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}

            <Form.Group className="text-center">
              {image ? (
                <>
                  <figure>
                    <Image className={appStyles.Image} src={image} rounded />
                  </figure>
                  <div>
                    <Form.Label
                      className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                      htmlFor="image-upload"
                    >
                      Change the image
                    </Form.Label>
                  </div>
                </>
              ) : (
                <Form.Label
                  className="d-flex justify-content-center"
                  htmlFor="image-upload"
                >
                  <Asset
                    src={Upload}
                    message="Click or tap to upload an image"
                  />
                </Form.Label>
              )}

              <Form.File
                id="image-upload"
                accept="image/*"
                onChange={handleChangeImage}
                ref={imageInput}
              />
            </Form.Group>
            {errors?.image?.map((message, idx) => (
              <Alert variant="warning" key={idx}>
                {message}
              </Alert>
            ))}
            <div className="d-md-none">{textFields}</div>
          </Container>
        </Col>
      </Row>
    </Form>
  );
}

export default TaskCreateForm;
