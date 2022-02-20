import React from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'app-routes';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <Menu className={styles.headerMenu}>
      <Link route="/">
        <a className={styles.headerLink}>Crowdfunding App</a>
      </Link>
      <Menu.Menu position="right">
        <Link route="/">
          <a className={styles.headerLink}>Campaigns</a>
        </Link>
        <Link route="/campaigns/new">
          <a className={styles.headerLink}>+</a>
        </Link>
      </Menu.Menu>
    </Menu>
  );
};

export default Header;
