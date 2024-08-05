import React from 'react'
import NoResults from "../assets/no-results.png"
import styles from "../styles/NotFound.module.css"
import Asset from './Asset'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
        <Asset
            src={NoResults}
            message={`Sorry, the page you're looking for doesn't exist`} 
        />
        <Link to="/">Click here to go back to the home page</Link>
    </div>
  );
};

export default NotFound