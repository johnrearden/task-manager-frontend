import React from "react";
import TaskList from "./TaskList";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Tab, Tabs } from "react-bootstrap";

function TaskTabs() {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  return (
    <Tabs defaultActiveKey="assigned" id="task-tabs">
      <Tab eventKey="assigned" title="Assigned to me">
      <TaskList
                message="No results found. Adjust the search keyword assign a task to yourself."
                filter={`assignee__profile=${profile_id}&ordering=-updated_at&`}
              />
      </Tab>
      <Tab eventKey="Watched by me" title="Watched by me">
      <TaskList
                message="No results found. Adjust the search keyword or watch a task."
                filter={`watched__owner__profile=${profile_id}&ordering=-watchers__created_at&`}
              />
      </Tab>
      <Tab eventKey="Created by me" title="Created by me">
        Created by me"
      </Tab>
      <Tab eventKey="All" title="All">
        <TaskList message="No results found. Adjust the search keyword." />
      </Tab>
    </Tabs>
  );
}

export default TaskTabs;
