import styles from './Style2.module.scss';
import React, {useState, useEffect} from 'react';

import Observer from '@components/observer/Observer';

import {BsThreeDots, BsCursor, BsHeart, BsChat, BsFillHeartFill, BsBookmark} from 'react-icons/bs';

interface Props {
  link: string, 
  images: string[],
  username?: string,
  text?: string,
  time?: string,
  likes?: string,
  children: React.ReactNode | React.ReactElement
};

const Gallery = ({link, images, username="doe_doe", text="#example #insta", likes="100", time="10 minutes ago", children}: Props) => {

    const [onLarge, setOnLarge] = useState(false);

    useEffect(() => {
      if(onLarge) document.body.classList.add("bodyScrollBar");
      return () => document.body.classList.remove('bodyScrollBar');
    }, [onLarge]);

    return (
      <div className={styles.container}>

        <div className={styles.instagram}>
          <div className={styles.header}>
              <a className={styles.left} href={link}>
                <span />
                <span>{username}</span>
              </a>
              <div className={styles.right}>
                <a href={link} rel="noopener noreferrer" target="_blank">FOLLOW</a>
                <BsThreeDots/>
              </div>
          </div>
          <div className={styles.images}>
            {children}
          </div>
          <div className={styles.emoji} onClick={() => setOnLarge(true)}>
            <div>
              <BsHeart/>
              <BsChat/>
              <BsCursor/>
            </div>
            <div>
              <BsBookmark/>
            </div>
          </div>
          <div className={styles.likes}>
            <BsFillHeartFill/>
            <small> {likes} likes</small>
          </div>
          <a className={styles.message} href={link} rel="noopener noreferrer" target="_blank">
            <span>{username}</span>
            <span>{text}</span>
            <span>{time}</span>
          </a>
        </div>

        {onLarge && 
          <div className={styles.cover} onClick={() => setOnLarge(false)}>
            <div className={styles.contents} onClick={(e) => e.stopPropagation()}>
              {images.map((el, index) =>
                <Observer key={index}>
                  <img key={index} src={el} alt={"mapped"}/> 
                </Observer> 
              )}
            </div>
          </div>
        }
      </div>
    )
}

export default Gallery