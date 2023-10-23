import styles from './Actions.module.scss';
import React, {useContext} from 'react';
import {Context} from '../Context';
import {api} from '@database/api';

const Actions = () => {

  const {setActions, actions, setData} = useContext(Context);

  const create = async () => {
    const response = await api.post("/news", {
      image: [],
      description: "",
      button: {href: "", name: ""},
      timestamp: Date.now()
    });
    setData(state => [ response.data.data, ...state])
  }

  return (
    <div className={styles.container}>
        <button onClick={create}>Create</button>
        <button onClick={() => actions === "reorder" ? setActions("") : setActions("reorder")}>{actions === "reorder" ? "done" : "reorder"}</button>
    </div>
  )
}

export default Actions