import styles from './Navbar.module.scss';
import React, {useContext} from 'react';
import { useRouter } from 'next/router'
import {Context} from '@context/useAuthentication';
import Link from 'next/link';

import Link2 from '@components/link/Style2';
import SlideIn from '@components/slidein/Style1';
import Button from '@components/button/Button';
import Square from '@components/button/Square'
import Line from '@components/line/Style1';
import {AiOutlineMenu} from 'react-icons/ai';

const Index = () => {

    const {user} = useContext(Context);
    
    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("user");
        window.location.reload();
    };
    
    return (
        <div className={styles.container}>

            <nav className={styles.logo}>
                <Link href="/">THE NAILIST</Link>
            </nav>

            <nav className={styles.links}>
                <Link href="/prices" className={router.pathname.includes("prices") ? styles.selected : ""}>Prices</Link>
                <Link href="/prices">Contacts</Link>
                <Link href="/prices">Services</Link>
                <Link href="/prices">About</Link>
            </nav>

            {user 
            ?
                <SlideIn icon={<Square label1={<AiOutlineMenu/>} />} iconOpen={user.email}>
                    <Button label1="Logout" onClick={logout} color="red" />
                    <Line />
                    <Link2 href="/admin/prices" value="Prices" />
                </SlideIn>
            :
                <div>
                    <Link href="/login">Login</Link>
                </div>
            }
            
            
        </div>
    )
}

export default Index