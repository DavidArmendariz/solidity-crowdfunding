import { Link } from 'app-routes';
import React from 'react';
import { Menu } from 'semantic-ui-react';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <Menu className={styles.headerMenu}>
      <Link route="/">
        <a className={styles.headerLink}>CrowdCoin</a>
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