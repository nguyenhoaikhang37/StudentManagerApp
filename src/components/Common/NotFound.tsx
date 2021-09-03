import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './NotFound.module.css';

export interface NotFoundProps {}
export const NotFound = (props: NotFoundProps) => {
  const history = useHistory();

  const handleGoBack = () => {
    history.push('./login');
  };

  return (
    <div className={styles.bg}>
      <h1 className={styles.nf_title}>404</h1>
      <p>Oops! Something is wrong.</p>
      <a className={styles.button} onClick={handleGoBack}>
        <i className="icon-home" /> Go back in initial page, is better.
      </a>
    </div>
  );
};
