import styles from './Prices.module.scss';
import React from 'react';
import { PropsTypes } from 'pages/services';

const PricesIndex = ({prices}: PropsTypes) => {

  return (  !prices ? null :  
    <div className={styles.container}>

      <h1>PRICE LIST</h1>

      <div className={styles.content}>
        {prices.map(el =>
          <div key={el._id} className={styles.pricelist}>
            <h1>{el.name}</h1>
            <div className={styles.headers}>
              <div/>
              <div>
                {el.headers.second ? <p>{el.headers.second}</p> : ""}
                {el.headers.first ? <p>{el.headers.first}</p> : ""}
              </div>
            </div>
            <div className={styles.price}>
              {el.prices.map(p =>
                <div key={p._id} className={styles.priceElement}>
                  <div className={styles.name}>
                    <p>{p.name}</p>
                    <small>{p.small}</small>
                  </div>
                  <div className={styles.header}>
                    {p.hsecond ? <p>{p.hsecond}</p> : ""}
                    {p.hfirst ? <p>{p.hfirst}</p> : ""}
                  </div>
                </div>  
              )}
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

export default PricesIndex