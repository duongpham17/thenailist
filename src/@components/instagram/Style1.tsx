import styles from './Style1.module.scss';
import React, {useState, useEffect} from 'react';

import Observer from '@components/observer/Observer';

import {BsThreeDots, BsCursor, BsHeart, BsChat, BsFillHeartFill, BsBookmark} from 'react-icons/bs';
import {MdKeyboardArrowLeft, MdKeyboardArrowRight} from 'react-icons/md';

interface Props {
  link: string, 
  images: string[],
  username?: string,
  text?: string,
  time?: string,
  likes?: string,
  icon?: string,
};

const Gallery = ({link, icon, images, username="doe_doe", text="#example #insta", likes="100", time="10 minutes ago"}: Props) => {

    const [onLarge, setOnLarge] = useState(false);

    const [index, setIndex] = useState(0);

    useEffect(() => {
      if(onLarge) document.body.classList.add("bodyScrollBar");
      return () => document.body.classList.remove('bodyScrollBar');
    }, [onLarge]);

    const onRight = () => {
      if(images.length - 1 === index) return setIndex(0);
      setIndex(index => index + 1);
    };

    const onLeft = () => {
      if(index === 0) return;
      setIndex(index => index - 1)
    };

    return (
      <div className={styles.container}>

        <div className={styles.instagram}>
          <div className={styles.header}>
              <a className={styles.left} href={link}>
                {icon ? <img src={icon} alt="iag" /> : <span />}
                <span>{username}</span>
              </a>
              <div className={styles.right}>
                <a href={link} rel="noopener noreferrer" target="_blank">FOLLOW</a>
                <BsThreeDots/>
              </div>
          </div>
          <div className={styles.images}>
              <button className={styles.left} onClick={onLeft}><MdKeyboardArrowLeft/></button>
              <img src={images[index]} alt="instagram" />
              <button className={styles.right} onClick={onRight}><MdKeyboardArrowRight/></button>
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