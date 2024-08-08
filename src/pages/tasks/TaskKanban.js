import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import InfiniteScroll from "react-infinite-scroll-component";

import { fetchMoreData } from "../../utils/utils";
import appStyles from "../../App.module.css";
// import styles from "../../styles/TaskKanban.module.css";
import listStyles from "../../styles/TaskList.module.css";
import Task from "./Task";
import Asset from "../../components/Asset";
import NoResults from "../../assets/no-results.png";
// import ProfileList from "../profiles/ProfileList";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function TaskKanban({ message, filter = "" }) {
  const [tasks, setTasks] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  const [query, setQuery] = useState("");

  const currentUser = useCurrentUser();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await axiosReq.get(`/tasks/?${filter}search=${query}`);
        setTasks(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchTasks();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser]);

  return (
    <Row>
      <Col>
        <i className={`fas fa-search ${listStyles.SearchIcon}`} />
        <Form
          className={listStyles.SearchBar}
          onSubmit={(event) => event.preventDefault()}
        >
          <Form.Control
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            type="text"
            className="mr-sm-2"
            placeholder="Search tasks"
          />
        </Form>
        {hasLoaded ? (
          <>
            {tasks.results.length ? (
              <>
              <Row>
            
              <Col className="col-4">
              <h2 className="text-center">To do</h2>
              <InfiniteScroll
                children={tasks.results.map((task) => (
                task.status === "TO-DO" && (
                  <Task key={task.id} {...task} setTasks={setTasks} />
                )
                ))}
                dataLength={tasks.results.length}
                loader={<Asset spinner />}
                hasMore={!!tasks.next}
                next={() => fetchMoreData(tasks, setTasks)}
              />
              </Col>

              <Col className="col-4">
              <h2 className="text-center">In progress</h2>
              <InfiniteScroll
                children={tasks.results.map((task) => (
                task.status === "IN-PROGRESS" && (
                  <Task key={task.id} {...task} setTasks={setTasks} />
                )
                ))}
                dataLength={tasks.results.length}
                loader={<Asset spinner />}
                hasMore={!!tasks.next}
                next={() => fetchMoreData(tasks, setTasks)}
              />
              </Col>

              <Col className="col-4">
              <h2 className="text-center">Done</h2>
              <InfiniteScroll
                children={tasks.results.map((task) => (
                task.status === "DONE" && (
                  <Task key={task.id} {...task} setTasks={setTasks} />
                )
                ))}
                dataLength={tasks.results.length}
                loader={<Asset spinner />}
                hasMore={!!tasks.next}
                next={() => fetchMoreData(tasks, setTasks)}
              />
              </Col>
              </Row>
              </>
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
        )}{" "}
      </Col>
      {/* <Col className="d-none d-lg-block col-3 p-0 p-lg-2">
        <ProfileList />
      </Col> */}
    </Row>
  );
}

export default TaskKanban;
