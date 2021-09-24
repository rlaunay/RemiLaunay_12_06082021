import classes from './Layout.module.scss';
import LeftNav from './LeftNav';
import TopNav from './TopNav';

const Layout: React.FC = (props) => {
  return (
    <div className={classes.layout}>
      <TopNav />
      <div className={classes.flex}>
        <LeftNav />
        <main>{props.children}</main>
      </div>
    </div>
  );
};

export default Layout;
