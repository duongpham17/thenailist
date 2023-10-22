import styles from './Services.module.scss';
import React, {useEffect, useState} from 'react';

const Services = () => {

  const [image, setImage] = useState(1);

  useEffect(() => {
    let interval = setInterval(() => {
      if(image >= 4) {
        setImage(() => 1);
      } else {
        setImage((img) => img + 1)
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [image]);

  return (
    <div className={styles.container}>
      <p style={{ backgroundImage: `url(/${image}.jpg)`}}>THE NAILIST</p>
    </div>
  )
}

export default Services