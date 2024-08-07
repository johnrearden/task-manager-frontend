import React from "react";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import Asset from "../../components/Asset";
import { useProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

/**
 * Render the list of profiles from most to least recently updated
 */
const ProfileList = () => {
  const { profileList } = useProfileData();
  const currentUser = useCurrentUser();

  return (
    // only render the component if a user is logged in
    currentUser && (
      <Container className={appStyles.Content}>
        {/* if profiles are loaded, render them using the Profile component */}
        {profileList.results.length ? (
          <>
            <Link className="align-self-center" to={`/team`}>
              <h3>
                <i class="fa-solid fa-users-line"></i>Teammates
              </h3>
            </Link>
            {/* list of users excluding the logged-in user */}
            {profileList.results.map(
              (profile) =>
                profile &&
                Number(profile.id) !== Number(currentUser.pk) && (
                  <Profile key={profile.id} profile={profile} />
                )
            )}
          </>
        ) : (
          // indicate if component is still loading
          <Asset spinner />
        )}
      </Container>
    )
  );
};

export default ProfileList;
