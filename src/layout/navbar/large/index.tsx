import styles from './Large.module.scss';
import React, {useContext} from 'react';
import {Context} from '@context/useAuthentication';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {links, adminLinks, userLinks} from '../data';

import Button from '@components/button/Button';
import SlideIn from '@components/slidein/Style1';
import Line from '@components/line/Style1';
import Link2 from '@components/link/Style2';
import Square from '@components/button/Square';
import Flex from '@components/flex/Style1';

import { AiOutlineMenu } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';

const Large = () => {

  const {user} = useContext(Context);

  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className={styles.container}>

      <div className={styles.brand}>
        <Link href="/">
          <h1>THE NAILIST</h1>
        </Link>
      </div>

      <div className={styles.links}>
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
      </div>

      {/* { user?.role 
      ?
          <SlideIn icon={<Square label1={<AiOutlineMenu/>} color="black"/>} iconOpen={<Button label1={<Flex><small>Logout</small> <MdLogout/></Flex>} onClick={logout} />}>
              <small>{user.role} | {user.email}</small>
              <Line />
              {(user.role === "admin" ? adminLinks : userLinks).map(el => 
                <Link2 key={el.id} href={el.href} value={el.name} style={{margin: "0.5rem 0"}} />  
              )}
          </SlideIn>
        :
          <div>
            <Link href="/login">Login</Link>
          </div>
        } */}

    </div>
  )
}

export default Large