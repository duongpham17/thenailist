import styles from './Prices.module.scss';
import React from 'react';
import {PropsTypes} from 'pages/prices';
import useOpen from '@hooks/useOpen';
import Openarrow from '@components/button/Openarrows';
import Flex from '@components/flex/Style1';

const PricesIndex = (props: PropsTypes) => {

  const {onOpenItems, openItems} = useOpen({initialState: ""})

  return (
    <div className={styles.container}>

      <div className={styles.content}>
        {props.prices.map(el => 
          <div key={el._id} className={styles.element}>
            <div className={styles.header} onClick={() => onOpenItems(el._id)}>
              <h2>{el.name}</h2>
              <Openarrow open={!openItems.includes(el._id)}/>
            </div>
            {!openItems.includes(el._id) &&
              el.prices.map(p => 
                <div key={p._id} className={styles.item}>
                  {p.discount > 0
                      ? 
                        <div className={styles.discount}>
                          <p className={styles.name}>
                            <span>{p.name}</span> 
                            <span>{p.discount} %</span>
                          </p>
                          <p className={styles.price}>
                            <s>{p.price}</s> 
                            <span>{Math.round(p.price * ( 1 - (p.discount / 100)))}</span>
                          </p>
                        </div>
                      : 
                        <div>
                          <p className={styles.name}>{p.name}</p> 
                          <p>{p.price}</p>
                        </div> 
                  }
                </div>
              )
            }
          </div>  
        )}
      </div>

    </div>
  )
}

export default PricesIndex