import React from "react";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/ProfileList.module.css";
import Asset from "../../components/Asset";
import { useProfileData, useSetProfileData } from "../../contexts/ProfileDataContext";
import Profile from "./Profile";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";

/**
 * Render the list of profiles from most to least recently updated
 */
const ProfileList = () => {
  const { profileList } = useProfileData();
  // const { setProfileData } = useSetProfileData();
  const currentUser = useCurrentUser();
  console.log('profileList', profileList)
  console.log('profileList.results.length', profileList.results.length)
  console.log('!!profileList.next', !!profileList.next)

  return (
    // only render the component if a user is logged in
    currentUser && (
      <Container 
          className={`
          ${appStyles.Content}          
          ${styles.Container}
          // overflowY: "scroll"
        `} 
          // id="scrollableDiv"
      >
        {/* if profiles are loaded, render them using the Profile component */}
        {profileList.results.length ? (
          <>
            <Link className="align-self-center" to={`/team`}>
              <h3>
                <i className="fa-solid fa-users-line"></i>Teammates
              </h3>
            </Link>
            <InfiniteScroll
                  children={profileList.results.map(
              (profile) =>
                profile &&
                /* list of users excluding the logged-in user */
                Number(profile.id) !== Number(currentUser.pk) && (
                  <Profile key={profile.id} profile={profile} />
                )
            )}
            dataLength={profileList.results.length}
            // loader={<Asset spinner />}
            loader={"InfiniteScroll is loading more profiles..."}

            // height={400}
            hasMore={!!profileList.next}
            endMessage={"You have viewed all teammates"}
            // scrollableTarget="scrollableDiv"
            next={() => {
              // the following does not make the right API call
              // fetchMoreData(useProfileData, useSetProfileData)

              fetchMoreData(profileList, useSetProfileData)
            }
          }
          />
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
