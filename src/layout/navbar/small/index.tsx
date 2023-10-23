import styles from './Small.module.scss';
import React, {useEffect, useContext} from 'react';
import {Context} from '@context/useAuthentication';
import Link from 'next/link';
import { Squeeze as Hamburger } from 'hamburger-react';
import { adminLinks, userLinks } from '../data';
import Observer from '@components/observer/Observer';
import {bars} from "../data";
import { MdKeyboardArrowDown } from 'react-icons/md';
import useScroll from '@hooks/useScroll';
import useOpen from '@hooks/useOpen';

const Small = () => {
  
  const {open, setOpen, onOpen, openItems, onOpenItems} = useOpen({initialState: ""});

  const {user} = useContext(Context);

  const {scrollY} = useScroll();

  useEffect(() => {
    if(open) document.body.classList.add("bodyScrollBar");
    return () => document.body.classList.remove('bodyScrollBar');
  }, [open]);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const quickbar = [
    {
      name: "Book",
      href: "/"
    },
    {
      name: "Services",
      href: "/services"
    },
    {
      name: "Find",
      href: "/about#gettinghere"
    },
  ]

  return (
    <div className={`${styles.container} ${scrollY >= 130 ? styles.fixed : ""}`}>

      <div className={`${styles.header} ${open ? styles.hamburgerIsOpen : ""}`}>      
        <div className={styles.sides}>
          <Hamburger onToggle={onOpen} toggled={open} size={20}/>
        </div>
        <Link href="/" onClick={() => setOpen(false)}>
          <h2>THE NAILIST</h2>
          <b>NAILS - BROWS - BEAUTY</b>
        </Link>
        {open ? 
          <div className={styles.sides}>
            {!user 
            ? 
              <Link href="login" onClick={onOpen}>  
                <small>Login</small>
              </Link>
            :
              <button onClick={logout}>
                Logout
              </button>
            }
          </div>  
          :
          <div className={styles.sides}>
            
          </div>
        }
      </div>

      <div className={styles.bars}>
        {quickbar.map(el =>
          <Link key={el.name} href={el.href}>{el.name.toUpperCase()}</Link>  
        )}
      </div>

      <Observer>
        <div className={`${styles.menu} ${open ? styles.menuIsOpen : styles.menuIsClose}`}>
          <div className={styles.contents}>

            {user?.role &&
              <div className={styles.admin}>
                {user.role === "admin" ? <h3>Admin Pages</h3> : ""}
                {(user.role === "admin" ? adminLinks : userLinks).map((el) => 
                  <Link key={el.id} href={el.href} onClick={onOpen}>
                    {el.name} 
                  </Link>
                )}
              </div>
            }

            {bars.map(el => 
              <div className={styles.bar} key={el.id}>
                {el.links.length ?
                  <>
                    <button className={styles.btn} onClick={() => onOpenItems(el.id.toString())}>
                      <span>{el.name.toUpperCase()}</span> 
                      <MdKeyboardArrowDown />
                    </button>
                    { openItems.includes(el.id.toString()) &&
                      <ul>
                        {el.links.map(l => 
                          <li><Link href={l.href} onClick={onOpen}>{l.name.toUpperCase()}</Link></li>  
                        )}
                      </ul>
                    }
                  </>
                : 
                  el.href ? <Link className={styles.btn} href={el.href} onClick={onOpen}>{el.name.toUpperCase()}</Link> : ""
                }
              </div>
            )}

            {/* {links.map((el) => 
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
              )} */}

            </div>
        </div>
      </Observer>
      
    </div>
  )
}

export default Small