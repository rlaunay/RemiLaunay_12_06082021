import React from 'react';
import useAuth from '../../../context/authContext';

import classes from './Header.module.scss';

const Header = () => {
  const { user } = useAuth();

  return (
    <header className={classes.header}>
      <h1>
        Bonjour <span>{user?.userInfos.firstName}</span>
      </h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </header>
  );
};

export default Header;
