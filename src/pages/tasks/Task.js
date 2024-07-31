import React from "react";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";
import { axiosRes } from "../../api/axiosDefaults";

import Avatar from "../../components/Avatar";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import styles from "../../styles/Task.module.css";

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
    assignee_image,
    image,
    priority,
    status,
    due_date,
    owner_id,
    owner_image,
    watched_id,
    watchers_count,
    taskDetail,
    setTasks,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  const handleWatch = async () => {
    try {
      // make API request
      const { data } = await axiosRes.post("/watchers/", {task:id});
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
          {/* change this to assignee image & name when this is implemented */}
          {assignee && (
            <Link to={`/profiles/${assignee}`}>
              <Avatar src={assignee_image} height={55} />
              {assignee_username}
            </Link>
          )}
          <div className="d-flex align-items-center">
            <span>{status}</span>
            {is_owner && taskDetail && "..."}
          </div>
          <div className="d-flex align-items-center">
            <span>Prio: {priority}</span>
            {is_owner && taskDetail && "..."}
          </div>
        </Media>
      </Card.Body>

      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {excerpt && <Card.Text>{excerpt}</Card.Text>}
        {due_date && <Card.Text>{due_date}</Card.Text>}
        {description && <Card.Text>{description}</Card.Text>}
        {updated_at && <Card.Text>Last updated on: {updated_at}</Card.Text>}
        {created_at && <Card.Text>Created on: {created_at}</Card.Text>}
        <div>
          <Card.Text>Created by: </Card.Text>
          <Link to={`/profiles/${owner_id}`}>
            <Avatar src={owner_image} height={55} />
            {owner}
          </Link>
        </div>

        <Link to={`/tasks/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>

        <div className={styles.TaskBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't watch your own tasks!</Tooltip>}
            >
              <i className="fa-solid fa-eye-slash" />
            </OverlayTrigger>
          ): watched_id ? (
            <span onClick={handleUnwatch}>
              <i className={`fa-solid fa-eye ${styles.Eye}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleWatch}>
              <i className={`fa-solid fa-eye ${styles.EyeOutline}`} />
            </span>
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
