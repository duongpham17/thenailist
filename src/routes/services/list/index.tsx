import styles from './List.module.scss';
import React from 'react';
import Link from 'next/link';
import { PropsTypes } from 'pages/services';
import Shapes from './shapes';

const List = ({services}: PropsTypes) => {

  return (
    <div className={styles.container} id="what">

      <div className={styles.content}>

        <h1 className={styles.header}>WHAT WE DO</h1>

          {services?.map(el => 
              <div className={styles.element} key={el._id} id={el.name.toLowerCase()}>
                <h1>{el.name.toUpperCase()}</h1>
                {el.items.map(item => 
                  <div key={item._id} className={styles.item}>
                      <div className={styles.information}>
                        {item.description.split("\n").map((el, index) => 
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
                          item.button.href ?  item.button.href.includes("http") 
                          ? <Link  className={styles.btn} href={item.button.href} rel="noopener noreferrer" target="_blank">{item.button.name} </Link> 
                          : <Link className={`${styles.btn} ${item.button.name.toLowerCase() === "book now" ? styles.book : ""}`} href={item.button.href}>{item.button.name}</Link> 
                          : null
                        }
                      </div>
                      <div className={styles.images}>
                        <img src={item.images[0]} alt="THENAILST" />
                      </div> 
                  </div>
                )}

                {el.name.toLowerCase() === "nails" &&
                  <Shapes/>
                }

              </div>    
          )}

      </div>
        
    </div>
  )
}

export default List