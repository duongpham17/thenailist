import styles from './Small.module.scss';
import React, {useEffect, useContext} from 'react';
import {Context} from '@context/useAuthentication';
import Link from 'next/link';
import { Squeeze as Hamburger } from 'hamburger-react';
import useOpen from '@hooks/useOpen';
import { links, adminLinks, userLinks } from '../data';
import Observer from '@components/observer/Observer';
import Line from '@components/line/Style1';
import { AiOutlineInstagram } from 'react-icons/ai';

const Small = () => {
  
  const {open, setOpen, onOpen} = useOpen({initialState: ""});

  const {user} = useContext(Context);

  useEffect(() => {
    if(open) document.body.classList.add("bodyScrollBar");
    return () => document.body.classList.remove('bodyScrollBar');
}, [open]);

  return (
    <div className={styles.container}>

      <div className={`${styles.header} ${open ? styles.hamburgerIsOpen : ""}`}>      
        <Link href="/" onClick={() => setOpen(false)}> The Nailist </Link>
        <Hamburger onToggle={onOpen} toggled={open}/>
      </div>

      <Observer>
        <div className={`${styles.menu} ${open ? styles.menuIsOpen : styles.menuIsClose}`}>
          <div className={styles.contents}>
            <ul> 
            {user?.role &&
              <div>
                {user.role === "admin" ? <p>Admin Pages</p> : ""}
                {(user.role === "admin" ? adminLinks : userLinks).map((el) => 
                  <Link key={el.id} href={el.href} onClick={onOpen}>
                    {el.name} 
                  </Link>
                )}
                <Line/>
              </div>
            }
            {links.map((el) => 
              el.href.includes("http") ?
                <Link 
                    key={el.id}
                    href={el.href} 
                    rel="noopener noreferrer" target="_blank"
                  >
                  {el.name} 
                </Link> 
              : 
                  <Link 
                    key={el.id}
                    href={el.href} 
                    onClick={onOpen}
                  >
                  {el.name} 
                </Link>
              )}
            </ul>

            <div className={styles.social}>
              <Link href="https://www.instagram.com/thenailist" rel="noopener noreferrer" target="_blank">  
                <AiOutlineInstagram className={styles.insta}/>
                <small>@thenailist</small>
              </Link>
              <Link href="login" onClick={onOpen}>  
                <small>Login</small>
              </Link>
            </div>

          </div>
        </div>
      </Observer>
      
    </div>
  )
}

export default Small