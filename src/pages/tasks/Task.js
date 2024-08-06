import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Tooltip from "react-bootstrap/Tooltip";
import { Link, useHistory } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Task.module.css";
import { MoreDropdown } from "../../components/MoreDropdown";

const Task = (props) => {
  const {
    id,
    owner,
    created_at,
    updated_at,
    title,
    excerpt,
    description,
    assignee,
    assignee_username,
    assignee_firstname,
    assignee_lastname,
    assignee_image,
    image,
    priority,
    status,
    due_date,
    owner_id,
    owner_firstname,
    owner_lastname,
    owner_image,
    watched_id,
    watchers_count,
    taskDetail,
    setTasks,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleEdit = () => {
    history.push(`/tasks/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/tasks/${id}/`);
      // redirect to home page after deleting a task
      history.push(`/`);
    } catch (err) {
      console.log(err);
      setShowDeleteModal(false);
    }
  };

  const handleWatch = async () => {
    try {
      // make API request
      // sending the correct id (watched) solved with the help of tutor Oisin
      const { data } = await axiosRes.post("/watchers/", { watched: id });
      //   update task data
      setTasks((prevTasks) => ({
        ...prevTasks,
        results: prevTasks.results.map((task) => {
          return task.id === id
            ? {
                ...task,
                watchers_count: task.watchers_count + 1,
                watched_id: data.id,
              }
            : task;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnwatch = async () => {
    try {
      await axiosRes.delete(`/watchers/${watched_id}/`);
      setTasks((prevTasks) => ({
        ...prevTasks,
        results: prevTasks.results.map((task) => {
          return task.id === id
            ? {
                ...task,
                watchers_count: task.watchers_count - 1,
                watched_id: null,
              }
            : task;
        }),
      }));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Task}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          {/* Display assignee image & name or "not assigned" */}
          {assignee ? (
            <Link to={`/profiles/${assignee}`}>
              <Avatar src={assignee_image} height={55} />
              {/* show first name, last name or both if available
                  otherwise, show username */}
              {assignee_firstname
                ? assignee_firstname + " " + assignee_lastname
                : assignee_lastname
                ? assignee_lastname
                : assignee_username}
            </Link>
          ) : (
            <span>Not assigned</span>
          )}
          <div className="d-flex align-items-center">
            <span>{status}</span>
          </div>
          <div className="d-flex align-items-center">
            <span>Prio: {priority}</span>
            {/* available on both TaskDetail & TaskList views */}
            {is_owner && (
              <MoreDropdown
                handleEdit={handleEdit}
                handleDelete={() => setShowDeleteModal(true)}
              />
            )}{" "}
          </div>

          {/* deletion confirmation modal based on 
          https://github.com/Code-Institute-Submissions/ci_pp5_tick_it_react */}
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered={true}
          >
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletetion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </Media>
      </Card.Body>

      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        Excerpt: {excerpt && <Card.Text>{excerpt}</Card.Text>}
        Due date:{due_date && <Card.Text>{due_date}</Card.Text>}
        {description && <Card.Text>{description}</Card.Text>}
        {updated_at && <Card.Text>Last updated on: {updated_at}</Card.Text>}
        {created_at && <Card.Text>Created on: {created_at}</Card.Text>}
        <div>
          <Card.Text>Created by: </Card.Text>
          <Link to={`/profiles/${owner_id}`}>
            <Avatar src={owner_image} height={55} />
            {/* show first name, last name or both if available
                  otherwise, show username */}
            {owner_firstname
              ? owner_firstname + " " + owner_lastname
              : owner_lastname
              ? owner_lastname
              : owner}
          </Link>
        </div>
        <Link to={`/tasks/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <div className={styles.TaskBar}>
          {watched_id ? (
            <OverlayTrigger
              placement="top"
              // tooltip text not a mistake:
              // it will activate AFTER the onclick function is run
              overlay={<Tooltip>Unwatch task</Tooltip>}
            >
              <span onClick={handleUnwatch}>
                <i className={`fa-solid fa-eye ${styles.Eye}`} />
              </span>
            </OverlayTrigger>
          ) : currentUser ? (
            <OverlayTrigger
              placement="top"
              // tooltip text not a mistake:
              // it will activate AFTER the onclick function is run
              overlay={<Tooltip>Watch task</Tooltip>}
            >
              <span onClick={handleWatch}>
                <i className={`fa-solid fa-eye ${styles.EyeOutline}`} />
              </span>
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              placement="top"
              //   this might have to be changed/removed,
              // as only logged-in users will be able to see tasks
              overlay={<Tooltip>Log in to follow tasks!</Tooltip>}
            >
              <i className="fa-solid fa-eye" />
            </OverlayTrigger>
          )}
          {watchers_count}
          {/* <Link to={`/tasks/${id}`}>
          <i className="far fa-comments" />
        </Link>
        {comments_count} */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Task;
