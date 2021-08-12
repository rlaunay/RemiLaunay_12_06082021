import React from "react";
import Logo from "../../Icon/Logo";

import classes from './TopNav.module.scss'

const TopNav: React.FC = () => {
  return (
    <nav className={classes.nav}>
      <Logo />
      <a href="#">Accueil</a>
      <a href="#">Profil</a>
      <a href="#">Réglage</a>
      <a href="#">Communauté</a>
    </nav>
  )
}

export default TopNav