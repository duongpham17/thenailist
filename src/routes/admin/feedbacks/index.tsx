import styles from './Feedbacks.module.scss';
import React, {useState, useEffect, useMemo} from 'react';
import { IFeedbacksApi } from '@database/models/feedbacks';
import api from '@database/api';
import { formatDate, isToday } from '@utils/function';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEmail, MdPerson } from "react-icons/md";
import Button from '@components/button/Round';

const FeedbacksIndex = () => {

  const [data, setData] = useState<IFeedbacksApi[] | []>();

  useEffect(() => {
    (async () => {
      const response = await api.get("/feedbacks");
      setData(response.data.data);
    })()
  }, []);

  const onDelete = async (id: string) => {
    setData(d => d?.filter(el => el._id != id));
    await api.delete(`/feedbacks/${id}`);
  };

  const FitleredByDate = useMemo(() => {
    const dates = [];
    if(!data) return [];

    for(let x of data){
        const itemDate = new Date(Number(x.timestamp)).toDateString();
        const dateIndex = dates.findIndex(el => el.date === itemDate);
        if(dateIndex === -1){
            dates.push({
                date: itemDate,
                timestamp: x.timestamp,
                items: [ x ]
            })
        } else {
            dates[dateIndex].items = [...dates[dateIndex].items, x]
        };
    };
    return dates;
  }, [data]);

  return (
    <div className={styles.container}>

      {FitleredByDate?.map(d => 
        <div key={d.date}>
            <h3 className={styles.date}>
              <span> {isToday(d.timestamp) ? "[ TODAY ]" : ""} {d.date}</span>
              <small>[{d.items.length}]</small>
            </h3>
            {d.items.map(el =>
              <div className={styles.element} key={el._id}>
              <p className={styles.summary}>
                <span>{formatDate(el.timestamp).split(" ").slice(4, 5)}</span>
                <Button label1={<RiDeleteBin5Fill/>} color="red" onClick={() => onDelete(el._id)} />
              </p>
    
              <p className={styles.info}>
                <MdEmail/>
                <span>{el.email}</span>
              </p>
              <p className={styles.info}>
                <MdPerson/>
                <span>{el.name}</span>
              </p>
            
              <p>{el.feedback}</p>
            </div>  
          )}
        </div>
      )}
    </div>
  )
}

export default FeedbacksIndex