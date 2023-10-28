import styles from './Shapes.module.scss';
import React from 'react';
import Image from 'next/image';
import {nail, french} from './data';

const Shapes = () => {
  return (
    <div className={styles.container}>
        <h3>Nail Shape Guide</h3>
        <section>
            {nail.map(el =>
                <div key={el.name} className={styles.element} >
                    <div>
                        <Image src={`/shapes/${el.src}`} alt={el.name} width={200} height={200} />
                        <p>{el.name}</p>
                    </div>
                </div>
            )}
        </section>
    </div>
  )
}

export default Shapes