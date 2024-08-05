import React from "react";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

/**
 * Render the list of profiles from most to least recently updated
 */
const ProfileList = () => {
  const { profileList } = useProfileData();

  return (
    <Container className={appStyles.Content}>
      {/* if profiles are loaded, render them using the Profile component */}
      {profileList.results.length ? (
        <>
          <Link className="align-self-center" to={`/team`}>
            <h3>
              <i class="fa-solid fa-users-line"></i>Teammates
            </h3>
          </Link>
          {profileList.results.map((profile) => (
            <Profile key={profile.id} profile={profile} />
          ))}
        </>
      ) : (
        // indicate if component is still loading
        <Asset spinner />
      )}
    </Container>
  );
};

export default ProfileList;
