import styles from './Large.module.scss';
import React, {useContext} from 'react';
import {Context as AuthenticationContext} from '@context/useAuthentication';
import Link from 'next/link';
import Image from 'next/image';
import {adminLinks, userLinks, bars} from '../data';
import Button from '@components/button/Button';
import SlideIn from '@components/slidein/Style1';
import Line from '@components/line/Style1';
import Link2 from '@components/link/Style2';
import Flex from '@components/flex/Style1';

import { MdLogout, MdKeyboardArrowDown } from 'react-icons/md';

import useScroll from '@hooks/useScroll';

const LargeIndex = () => {

  return (
    <div className={styles.container}>

      <Fixed />

      <LoggedIn />

      <Logo />

      <Bars />

    </div>
  )
}

export default LargeIndex;

const LoggedIn = () => {

  const {user} = useContext(AuthenticationContext);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return ( user?.role ?
      <div className={styles.loggedInContainer}>
        <SlideIn icon={"Logged in menu"} iconOpen={<Button label1={<Flex><small>Logout</small> <MdLogout/></Flex>} onClick={logout} />}>
            <small>{user.role} | {user.email}</small>
            <Line />
            {(user.role === "admin" ? adminLinks : userLinks).map(el => 
              <Link2 key={el.id} href={el.href} value={el.name} style={{margin: "0.5rem 0"}} color="black" />  
            )}
        </SlideIn>
      </div>
    : 
    null
  )
};

const Fixed = () => {
  const {scrollY} = useScroll();

  return ( scrollY >= 240 ?
    <div className={styles.fixedContainer}>
      <LoggedIn />
      <Bars />
    </div>
    : 
    null
  )
}

const Logo = () => {
  return (
    <div className={styles.logoContainer}>
      <Link href="/">
        <Image src={"/logo.jpg"} width={300} height={100} alt="the nailist"/>
      </Link>
    </div>
  )
};

const Bars = () => {
  return (
    <div className={styles.barsContainer}>

      {bars.map(el => 
        <div className={styles.bar} key={el.id}>
          {el.links.length ?
            <div className={styles.dropdown}>
              <button className={styles.dropdownBtn}>
                <Link href={el.href ? el.href : ""}>
                  <span>{el.name.toUpperCase()}</span> 
                  <MdKeyboardArrowDown />
                </Link>
              </button>
              <ul>
                {el.links.map((l, i) => 
                  <li key={i}>
                    <Link href={l.href}>{l.name.toUpperCase()}</Link>
                  </li>  
                )}
              </ul>
            </div>
          : 
            el.href ?  el.href.includes("http") 
            ? <button className={styles.dropdownBtn}>
                <Link href={el.href} rel="noopener noreferrer" target="_blank">{el.name.toUpperCase()} </Link> 
              </button>
            : <button className={styles.dropdownBtn}>
                <Link className={el.name.toLowerCase() === "book now" ? styles.booknow : ""} href={el.href}>{el.name.toUpperCase()}</Link> 
              </button>
            : null
          }
        </div>
      )}
    </div>
  )
};