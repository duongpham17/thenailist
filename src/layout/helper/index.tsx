import styles from './Helper.module.scss';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { MdOutlineQuestionMark, MdClose, MdEmail, MdLocationOn, MdOutlineSmartphone } from 'react-icons/md';
import { AiFillInstagram, AiFillFacebook } from 'react-icons/ai';

import { google_location, instagram, facebook, phone, email } from '@data/social';

const HelperIndex = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if(open) document.body.classList.add("bodyScrollBar");
        return () => document.body.classList.remove('bodyScrollBar');
    }, [open]);

    return (
        <div className={styles.container}>

            <div className={styles.btn}>
                <button onClick={() => setOpen(!open)}> 
                    { !open 
                        ? <MdOutlineQuestionMark/>
                        : <MdClose/>
                    }
                </button>
            </div>

            {open &&
                <div className={styles.cover} onClick={() => setOpen(false)}>

                    <div onClick={e => e.stopPropagation()} className={styles.content}>
                        <Link href={instagram} rel={"noopener noreferrer"} target={"_blank"}>
                            <p>INSTAGRAM</p>
                            <div><AiFillInstagram/></div>
                        </Link>

                        <Link href={facebook} rel={"noopener noreferrer"} target={"_blank"}>
                            <p>FACEBOOK</p>
                            <div><AiFillFacebook/></div>
                        </Link>

                        <Link href={`mailto:${email}`}>
                            <p>SEND AN EMAIL</p>
                            <div><MdEmail/></div>
                        </Link>

                        <Link href={`tel:${phone}`}>
                            <p>CALL US</p>
                            <div> <MdOutlineSmartphone/> </div>
                        </Link>

                        <Link href={google_location} rel={"noopener noreferrer"} target={"_blank"}>
                            <p>LOCATION</p>
                            <div><MdLocationOn /></div>
                        </Link>
                    </div>

                </div>
            }

        </div>
    )
}

export default HelperIndex