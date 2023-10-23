import styles from './Large.module.scss';
import React, {useContext} from 'react';
import {Context} from '@context/useAuthentication';
import Link from 'next/link';
import {links, adminLinks, userLinks, bars} from '../data';

import Button from '@components/button/Button';
import SlideIn from '@components/slidein/Style1';
import Line from '@components/line/Style1';
import Link2 from '@components/link/Style2';
import Flex from '@components/flex/Style1';

import { MdLogout, MdKeyboardArrowDown } from 'react-icons/md';

import useScroll from '@hooks/useScroll';

const Large = () => {

  const {user} = useContext(Context);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const {scrollY} = useScroll();

  console.log(scrollY);

  return (
    <div className={styles.container}>

    { user?.role &&
        <div className={styles.login}>
          <SlideIn icon={"Logged in menu"} iconOpen={<Button label1={<Flex><small>Logout</small> <MdLogout/></Flex>} onClick={logout} />}>
              <small>{user.role} | {user.email}</small>
              <Line />
              {(user.role === "admin" ? adminLinks : userLinks).map(el => 
                <Link2 key={el.id} href={el.href} value={el.name} style={{margin: "0.5rem 0"}} color="black" />  
              )}
          </SlideIn>
        </div>
    }

      <div className={styles.brand}>
        <Link href="/">
          <h1>THE NAILIST</h1>
          <b>NAILS - BROWS - BEAUTY</b>
        </Link>
      </div>

      <nav className={scrollY >= 200 ? styles.fixed : ""}>
        {bars.map(el => 
          <div className={styles.bar} key={el.id}>
            {el.links.length ?
              <>
                <button className={styles.btn}><span>{el.name.toUpperCase()}</span> <MdKeyboardArrowDown /></button>
                <ul>
                  {el.links.map((l, i) => 
                    <li key={i}><Link href={l.href}>{l.name.toUpperCase()}</Link></li>  
                  )}
                </ul>
              </>
            : 
              el.href ? 
                <Link 
                  className={`${styles.btn} ${el.name.toLowerCase() === "book now" ? styles.book : ""}`} 
                  href={el.href}>{el.name.toUpperCase()}
                </Link> 
              : 
                ""
            }
          </div>
        )}
      </nav>

      {/* <div className={styles.links}>
        {links.map((el) => 
            el.href.includes("http") ?
            <Link 
                key={el.id}
                href={el.href} 
                className={router.pathname.includes(el.value) ? styles.selected : ""}
                rel="noopener noreferrer" target="_blank"
              >
              {el.name.toUpperCase()} 
            </Link> 
          : 
              <Link 
                key={el.id}
                href={el.href} 
                className={router.pathname.includes(el.value) ? styles.selected : "" }
              >
              {el.name.toUpperCase()} 
            </Link>
        )}
      </div> */}

    </div>
  )
}

export default Large