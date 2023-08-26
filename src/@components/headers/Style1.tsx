import styles from './Style1.module.scss';
import React from 'react';

interface Props {
  value: any,
  size?: string, 
  center?: boolean,
  margin?: string,
  color?: string,
}

const Style1 = ({value, size, center=false, margin, color}: Props) => {
  return (
    <h1 
      className={styles.container} 
      style={{fontSize: size, textAlign: center ? "center" : "left", margin: margin, color: color}}>
        {value}
      </h1>
  )
}

export default Style1