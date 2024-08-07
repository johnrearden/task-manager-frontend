import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Asset from "../../components/Asset";

import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";

import ProfileList from "./ProfileList";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import { Image } from "react-bootstrap";

import InfiniteScroll from "react-infinite-scroll-component";
import Task from "../tasks/Task";
import { fetchMoreData } from "../../utils/utils";
import NoResults from "../../assets/no-results.png";
import { ProfileEditDropdown } from "../../components/MoreDropdown";

function ProfileDetail() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [profileTasks, setProfileTasks] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const setProfileData = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileTasks }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/tasks/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setHasLoaded(true);
        setProfileTasks(profileTasks);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
          />
        </Col>
        <Col lg={6}>
          <h3 className="m-2">
            {/* show first name, last name or both if available
                  otherwise, show username */}
            {profile?.firstname
              ? profile?.firstname + " " + profile?.lastname
              : profile?.lastname
              ? profile?.lastname
              : profile?.owner}
              {/* render " (me)" if logged-in user is viewing their own profile */}
              {currentUser?.username === profile?.owner
                ? " (me)"
                : ""}
          </h3>
          {/* show role, pronouns & about info if available */}
          <Row className="justify-content-center no-gutters">
            <Col className="my-2">
              {profile?.role && <div>Role: {profile?.role}</div>}
              {profile?.pronouns && <div>Pronouns: {profile?.pronouns}</div>}
              {profile?.about && (
                <div className="my-3">
                  <h5>About</h5> {profile?.about}
                </div>
              )}
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-lg-right">
          {/* show edit placeholder if signed in user is owner of the profile */}
          {currentUser && is_owner && <ProfileEditDropdown id={profile?.id} />}
        </Col>
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  //   tasks assigned to viewed profile
  const mainProfileTasks = (
    <>
      <hr />
      <p className="text-center">
        {profile?.tasks_count} tasks assigned to {" "}
        {/* render "me" if logged-in user is viewing their own profile,
        else render firstname if available, elif lastname, else username */}
        {currentUser?.username === profile?.owner
        ? "me"
        : profile?.firstname
          ? profile?.firstname
          : profile?.lastname
          ? profile?.lastname
          : profile?.owner}
      </p>
      <hr />
      {profileTasks.results.length ? (
        <InfiniteScroll
          children={profileTasks.results.map((task) => (
            <Task key={task.id} {...task} setTasks={setProfileTasks} />
          ))}
          dataLength={profileTasks.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileTasks.next}
          next={() => fetchMoreData(profileTasks, setProfileTasks)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`There are no tasks assigned to ${
            profile?.firstname
              ? profile?.firstname
              : profile?.lastname
              ? profile?.lastname
              : profile?.owner
          }.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfileTasks}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <ProfileList />
      </Col>
    </Row>
  );
}

export default ProfileDetail;
