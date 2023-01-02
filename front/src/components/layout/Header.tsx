import React, { useState } from "react";
import styles from './Header.module.css'
import { Link } from "react-router-dom";
const Header = () => {
    const [active, setActive] = useState(`${styles.nav__menu}`);
    const [icon, setIcon] = useState(`${styles.nav__toggler}`);
    const navToggle = () => {
      if (active === `${styles.nav__menu}`) {
        setActive(`${styles.nav__menu} ${styles.nav__active}`);
      } else setActive(`${styles.nav__menu}`);
  
      // Icon Toggler
      if (icon === `${styles.nav__toggler}`) {
        setIcon(`${styles.nav__toggler} ${styles.toggle}`);
      } else setIcon(`${styles.nav__toggler}`);
    };
    return (
      <nav className={styles.nav}>
        <Link to={'/'} className={styles.nav__brand}>
          YSB
        </Link>
        <ul className={active}>
          <li className={styles.nav__item}>
            <Link to={'/'} className={styles.nav__link}>
              Home
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to={'/'} className={styles.nav__link}>
              About
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to={'/'} className={styles.nav__link}>
              Portfolio
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to={'/'} className={styles.nav__link}>
              Skills
            </Link>
          </li>
          <li className={styles.nav__item}>
            <Link to={'/'} className={styles.nav__link}>
              Contact
            </Link>
          </li>
        </ul>
        <div onClick={navToggle} className={icon}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
        </div>
      </nav>
    );
};

export default Header;
