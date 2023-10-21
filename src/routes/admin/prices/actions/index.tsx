import styles from './Actions.module.scss';
import React, {useContext} from 'react';
import {Context} from '../Context';

const Actions = () => {

  const {setActions, actions} = useContext(Context) 

  return (
    <div className={styles.container}>
        <button onClick={() => setActions("create")}>Create</button>
        <button onClick={() => actions === "reorder" ? setActions("") : setActions("reorder")}>{actions === "reorder" ? "done" : "reorder"}</button>
    </div>
  )
}

export default Actions