import React from 'react';

import classes from './Header.module.scss';

const Header = () => {
  return (
    <header className={classes.header}>
      <h1>
        Bonjour <span>Thomas</span>
      </h1>
      <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>
    </header>
  );
};

export default Header;
