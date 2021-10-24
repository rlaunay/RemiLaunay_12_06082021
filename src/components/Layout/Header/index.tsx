import useAuth from '../../../context/authContext';

import classes from './Header.module.scss';

/**
 * Header
 * @returns {React.ReactElement}
 */
const Header = () => {
  const { user } = useAuth();
  const isSuccess = (user && user.score && user?.score >= 1)

  return (
    <header className={classes.header}>
      <h1>
        Bonjour <span>{user?.userInfos.firstName}</span>
      </h1>
      {isSuccess && <p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>}
    </header>
  );
};

export default Header;
