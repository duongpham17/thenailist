import styles from './Small.module.scss';
import React, {useEffect, useContext} from 'react';
import {IUsers} from '@database/models/users';
import {Context as AuthenticationContext} from '@context/useAuthentication';
import Link from 'next/link';
import Image from 'next/image';
import { adminLinks, userLinks, bars } from '../data';
import useScroll from '@hooks/useScroll';
import useOpen from '@hooks/useOpen';

import Observer from '@components/observer/Observer';

import { Squeeze as Hamburger } from 'hamburger-react';
import { MdKeyboardArrowDown } from 'react-icons/md';

interface Props {
  open: boolean,
  user: IUsers | null,
  openItems: any[],
  onOpen: () => void,
  onOpenItems: (value: string) => void,
}

const SmallIndex = () => {
  
  const {open, onOpen, openItems, onOpenItems} = useOpen({initialState: ""});

  const {user} = useContext(AuthenticationContext);

  useEffect(() => {
    if(open) document.body.classList.add("bodyScrollBar");
    return () => document.body.classList.remove('bodyScrollBar');
  }, [open]);

  const props = {
    open, 
    onOpen, 
    openItems,
    onOpenItems, 
    user,
  }

  return (
    <div className={styles.container}>

      <Fixed {...props} />

      <Header {...props} />

      <Bars />

      <Menu {...props} />
      
    </div>
  )
}

export default SmallIndex;

const Fixed = (props: Props) => {
  const {scrollY} = useScroll();

  return ( scrollY >= 160 ?
    <div className={styles.fixedContainer}>
      <Header {...props} />
      <Bars />
    </div>
    : null
  )
}

const Header = ({open, onOpen}: Props) => {

  return (
    <div className={`${styles.headerContainer} ${open ? styles.hamburgerIsOpen : ""}`}>      
      <div className={styles.sides}>
        <Hamburger onToggle={onOpen} toggled={open} size={20}/>
      </div>
      <Link href="/">
        <Image src={"/logo.jpg"} width={200} height={70} alt="THENAILIST"/>
      </Link>
      <div>
      </div>
    </div>
  )
}

const Bars = () => {

  const quickbar = [
    {
      name: "Book",
      href: "https://www.fresha.com/book-now/the-nailist-oswnfuoq/services?lid=1178907&pId=1118303"
    },
    {
      name: "Services",
      href: "/services"
    },
    {
      name: "Find",
      href: "/about#location"
    },
  ];

  return (
    <div className={styles.barsContainer}>
      {quickbar.map(el =>
        el.href.includes("http")?                 
        <Link key={el.name} href={el.href} rel="noopener noreferrer" target="_blank">{el.name.toUpperCase()} </Link>  :
        <Link key={el.name} href={el.href}>{el.name.toUpperCase()}</Link>  
      )}
    </div>
  )
}

const Menu = ({user, open, onOpen, onOpenItems, openItems}: Props) => {

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <Observer>
        <div className={`${styles.menuContainer} ${open ? styles.menuIsOpen : styles.menuIsClose}`}>

          <div className={styles.actions}>
            <Hamburger onToggle={onOpen} toggled={open} size={20}/>
            {!user 
              ? <Link href="login" onClick={onOpen}> Login </Link>
              : <button onClick={logout}> Logout </button>
            }
          </div>
          
          <div className={styles.content}>
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

                {!!el.links.length &&
                  <div>
                    <button className={styles.btn} onClick={() => onOpenItems(el.id.toString())}>
                      <span>{el.name.toUpperCase()}</span> 
                      <MdKeyboardArrowDown />
                    </button>
                    { openItems.includes(el.id.toString()) &&
                      <ul>
                        {el.links.map((l, index) => 
                          <li key={index}>
                            <Link href={l.href} onClick={onOpen}>{l.name.toUpperCase()}</Link>
                          </li>  
                        )}
                      </ul>
                    }
                  </div>
                }

                {!el.links.length && el.href 
                    ? el.href.includes("http") 
                    ? <button><Link className={styles.btn} href={el.href} rel="noopener noreferrer" target="_blank"> {el.name.toUpperCase()} </Link> </button>
                    : <button><Link className={styles.btn} href={el.href} onClick={onOpen}>{el.name.toUpperCase()} </Link> </button>
                    : ""
                }

              </div>
            )}

            </div>
        </div>
      </Observer>
  )
}