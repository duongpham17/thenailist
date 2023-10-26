import styles from './Services.module.scss';
import { useContext } from 'react';
import { Context } from '@context/useAuthentication';
import UseContext from './Context';

import Content from './content';
import Reorder from './reorder';
import Sidebar from './sidebar';

const AdminPricesIndex = () => {

  const {protect} = useContext(Context);

  protect(["admin"]);

  return (
    <UseContext>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <Sidebar />
        </div>  
        <div className={styles.content}>
            <Content />
            <Reorder />
        </div>
      </div>
    </UseContext>
  )
}

export default AdminPricesIndex;