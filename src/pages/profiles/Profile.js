import React from "react";
import styles from "../../styles/Profile.module.css";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;
  const { id, image, owner } = profile;

  return (
    <Link className="align-self-center" to={`/profiles/${id}`}>
      <div
        className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
      >
        <div>
          <Avatar src={image} height={imageSize} />
        </div>
        <div className={`mx-2 ${styles.WordBreak}`}>
          <strong>{owner}</strong>
        </div>
      </div>
    </Link>
  );
};

export default Profile;
