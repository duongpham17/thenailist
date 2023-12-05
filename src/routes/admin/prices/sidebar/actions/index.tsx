import styles from './Actions.module.scss';
import React, {useContext} from 'react';
import {Context} from '../../Context';
import {api} from '@database/api';

import {AiOutlinePlus, AiOutlineOrderedList} from 'react-icons/ai';

const Actions = () => {

  const {setActions, actions, setData} = useContext(Context);

  const create = async () => {
    const response = await api.post("/prices", {
      name: "NEW_TITLE",
      headers: {first: "", second: ""},
      prices: [],
      timestamp: Date.now()
    });
    setData(state => [ response.data.data, ...state])
  }

  return (
    <div className={styles.container}>
        <button onClick={create}><AiOutlinePlus/></button>
        <button onClick={() => actions === "reorder" ? setActions("") : setActions("reorder")}><AiOutlineOrderedList/></button>
    </div>
  )
}

export default Actions