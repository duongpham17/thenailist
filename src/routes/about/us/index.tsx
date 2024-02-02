import styles from './Us.module.scss';
import React from 'react';
import Link from 'next/link';
import { PropsTypes } from 'pages/about';

const Us = ({about}: PropsTypes) => {

  return (
    <div className={styles.container} id="what">

      <div className={styles.content}>

        <h1>WHAT WE DO</h1>

          {about?.map(el => 
              <div className={styles.element} key={el._id}>
                  <div className={styles.description}>
                  {el.description.split("\n").map((el, index) => 
                      el.includes("<p>") ? 
                          <p key={index}>{el.replaceAll("<p>", " ").replaceAll("</p>", " ")}</p>
                      : el.includes("<b>") ? 
                          <b key={index}>{el.replaceAll("<b>", " ").replaceAll("</b>", " ")}</b>
                      : el.includes("<small>") ?
                          <small key={index}>{el.replaceAll("<small>", " ").replaceAll("</small>", " ")}</small>
                      : el.includes("<h>") ?
                          <h3 key={index}>{el.replaceAll("<h>", " ").replaceAll("</h>", " ")}</h3>
                      : ""
                  )}
                    {
                        el.button.href ?  el.button.href.includes("http") 
                        ? <Link href={el.button.href} rel="noopener noreferrer" target="_blank">{el.button.name} </Link> 
                        : <Link className={`${styles.btn} ${el.button.name.toLowerCase() === "book now" ? styles.book : ""}`} href={el.button.href}>{el.button.name}</Link> 
                        : null
                    }
                  </div>
                  <div className={styles.images}>
                      <img src={el.images[0]} alt="sample" />
                  </div>
              </div>    
          )}

      </div>
        
    </div>
  )
}

export default Us