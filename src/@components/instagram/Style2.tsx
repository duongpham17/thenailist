import styles from './Style2.module.scss';
import React, {useState, useEffect} from 'react';

import Observer from '@components/observer/Observer';

import {BsThreeDots, BsCursor, BsHeart, BsChat, BsFillHeartFill, BsBookmark} from 'react-icons/bs';

interface InstagramTypes {
  caption: string,
  id: string,
  media_type: "VIDEO",
  media_url: string,
  permalink: string,
  thumbnail_url: string,
  timestamp: string
}

interface Props {
  link: string, 
  data: InstagramTypes[],
  image?: string,
  username?: string,
  text?: string,
  time?: string,
  likes?: string,
  children: React.ReactNode | React.ReactElement
};

const Gallery = ({link, image, data, username="doe_doe", text="#example #insta", likes="100", time="10 minutes ago", children}: Props) => {

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
                {image ? <img src={image} alt="insta" /> : <span />}
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
              {data.map((el, index) =>
                <Observer key={index}>
                  {el.media_type === "VIDEO"
                    ? <video src={el.media_url} controls/>
                    : <img key={index} src={el.media_url} alt={"mapped"}/> 
                  }
                </Observer> 
              )}
            </div>
          </div>
        }
      </div>
    )
}

export default Gallery