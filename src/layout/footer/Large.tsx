import styles from './Large.module.scss';
import React from 'react';
import Link from 'next/link';

import {AiFillInstagram, AiFillFacebook, AiOutlineClockCircle} from 'react-icons/ai';
import {MdLocationOn, MdEmail, MdOutlineSmartphone} from 'react-icons/md';

import { google_location, instagram, facebook, phone, shop_location, hours, email } from '@data/social';

const Large = () => {
  return (
    <footer className={styles.container}>

      <div className={styles.information}>

        <section className={styles.logo}>
          <h1>THE <br/> NAILIST <br/> <small>NAILS - BROWS - BEAUTY</small></h1>
          <div>
            <Link href={instagram} rel={"noopener noreferrer"} target={"_blank"}><AiFillInstagram/></Link>
            <Link href={facebook} rel={"noopener noreferrer"} target={"_blank"}><AiFillFacebook/></Link>
          </div>
        </section>
        
        <section className={styles.us}>
          <b>Get in Touch</b>
          <div>
            <MdEmail/>
            <Link href={`mailto:${email}`}>{email}</Link>
          </div>
          <div>
            <MdOutlineSmartphone/>
            <Link href={`tel:${phone}`}> {phone}</Link>
          </div>
          <div>
            <MdLocationOn />
            <Link href={google_location} rel={"noopener noreferrer"} target={"_blank"}>{shop_location}</Link>
          </div>
          <div>
            <AiOutlineClockCircle />
            <p>              
              {hours.weekdays.name}
              <br/> {hours.weekdays.time}<br/>
              {hours.saturday.name}
              <br/> {hours.saturday.time}<br/>
              {hours.sunday.name}
              <br/> {hours.sunday.time} <br/>
            </p>
          </div>
        </section>

        <section className={styles.links}>
          <b>Links</b>
          <Link href="/prices">Book now</Link>
          <Link href="/services">Services</Link>
          <Link href="/terms">Terms & Conditions</Link>
        </section>
      </div>

      <div className={`${styles.copyright}`}>
        <small>@ 2023 The Nailist Limited. All rights reserved</small>
      </div>

    </footer>
  )
}

export default Large