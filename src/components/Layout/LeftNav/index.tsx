import MeditaIco from './../../Icon/MeditaIco';
import NageIco from './../../Icon/NageIco';
import VeloIco from './../../Icon/VeloIco';
import AltereIco from './../../Icon/AltereIco';

import classes from './LeftNav.module.scss';

const LeftNav: React.FC = () => {
  return (
    <nav className={classes.nav}>
      <div className={classes.ico}>
        <MeditaIco />
        <NageIco />
        <VeloIco />
        <AltereIco />
      </div>
      <p>Copiryght, SportSee 2020</p>
    </nav>
  );
};

export default LeftNav;
