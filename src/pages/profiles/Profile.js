import React from "react";
import styles from "../../styles/Profile.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Profile = (props) => {
  const { profile, imageSize = 55 } = props;
  const { id, image, owner, firstname, lastname } = profile;

  return (
    <Link className="align-self-center" to={`/profiles/${id}`}>
      <div
        className={`my-3 d-flex align-items-center`}
      >
        <div>
          <Avatar src={image} height={imageSize} />
        </div>
        <div className={`mx-2 ${styles.WordBreak}`}>
          {/* show first name, last name or both if available
                  otherwise, show username */}
          <strong>
            {firstname
              ? firstname + " " + profile.lastname
              : lastname
              ? lastname
              : owner}
          </strong>
        </div>
      </div>
    </Link>
  );
};

export default Profile;
