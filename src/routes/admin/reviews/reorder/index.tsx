import styles from './Reorder.module.scss';
import React, {useContext, useState} from 'react';
import {Context} from '../Context';
import {api} from '@database/api';

const ReorderIndex = () => {

    const {actions, data, setData} = useContext(Context);

    const [reorderIndex, setReorderIndex] = useState(-1);

    const onReorder = async (index: number) => {
      if(reorderIndex === -1) return setReorderIndex(index);
      const newData = data[index];
      const oldData = data[reorderIndex];
      const dataUpdated = [...data];
      const res1 = await api.patch("/reviews", {...dataUpdated[index], timestamp: oldData.timestamp});
      const res2 = await api.patch("/reviews", {...dataUpdated[reorderIndex], timestamp: newData.timestamp});
      dataUpdated[index] = res2.data.data;
      dataUpdated[reorderIndex] = res1.data.data;
      setData(dataUpdated);
      setReorderIndex(-1);
    };
    
    return ( actions === "reorder" 
    ?
      <div className={styles.container}>
        {data.map((el, index) => 
          <div className={`${styles.element} ${reorderIndex === index ? styles.selected : ""}`} key={el._id} onClick={() => onReorder(index)}>
            <h3>{index+1}. {el.name}</h3>
            <p>{el.review}</p>
          </div>  
        )}
      </div>
      :
      null
    )
}

export default ReorderIndex;