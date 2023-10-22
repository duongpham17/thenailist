import styles from './Helper.module.scss';
import React, {useState, useEffect} from 'react';
import Link from 'next/link';
import { MdOutlineQuestionMark, MdClose, MdEmail, MdLocationOn, MdOutlineSmartphone } from 'react-icons/md';
import { AiFillInstagram, AiFillFacebook, AiFillGoogleCircle, AiOutlineClockCircle } from 'react-icons/ai';

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
                        <Link href={"/"} rel={"noopener noreferrer"} target={"_blank"}>
                            <p>Instagram</p>
                            <div><AiFillInstagram/></div>
                        </Link>

                        <Link href={"/"} rel={"noopener noreferrer"} target={"_blank"}>
                            <p>Facebook</p>
                            <div><AiFillFacebook/></div>
                        </Link>
                        <Link href={"/"} rel={"noopener noreferrer"} target={"_blank"}>
                            <p>Google</p>
                            <div><AiFillGoogleCircle/></div>
                        </Link>

                        <Link href="mailto:hello@thenailist.co.uk">
                            <p>Email</p>
                            <div><MdEmail/></div>
                        </Link>

                        <Link href="tel:02086167977">
                            <p>Phone</p>
                            <div> <MdOutlineSmartphone/> </div>
                        </Link>

                        <Link 
                            href="https://www.google.com/maps/place/Hippodrome/@51.511657,-0.131738,17z/data=!3m1!4b1!4m6!3m5!1s0x487604cd881e209d:0x144845c5aba0da3c!8m2!3d51.511657!4d-0.1291577!16zL20vMDR2Zmx3?entry=ttu"
                            rel={"noopener noreferrer"} 
                            target={"_blank"}
                        >
                            <p>Location</p>
                            <div><MdLocationOn /></div>
                        </Link>
                    </div>

                </div>
            }

        </div>
    )
}

export default HelperIndex