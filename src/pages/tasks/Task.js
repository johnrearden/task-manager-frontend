import React from "react";
import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Link } from "react-router-dom";

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
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;

  return (
    <Card className={styles.Task}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
        {/* change this to assignee image & name when this is implemented */}
        <Link to={`/profiles/${owner}`}>
            <Avatar src={owner_image} height={55} />
            {owner}
          </Link>
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
        {assignee && <Card.Text>{assignee}</Card.Text>}
        {due_date && <Card.Text>{due_date}</Card.Text>}
        {description && <Card.Text>{description}</Card.Text>}
        {updated_at && <Card.Text>Last updated on: {updated_at}</Card.Text>}
        {created_at && <Card.Text>Created on: {created_at}</Card.Text>}
        {owner && <Card.Text>Created by: {owner}</Card.Text>}

        <Link to={`/posts/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>

        <div className={styles.TaskBar}>
          {watched_id ? (
            <span onClick={() => {}}>
              <i className={`fa-solid fa-eye ${styles.Eye}`} />
            </span>
          ) : currentUser ? (
            <span onClick={() => {}}>
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
          {/* <Link to={`/posts/${id}`}>
          <i className="far fa-comments" />
        </Link>
        {comments_count} */}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Task;
