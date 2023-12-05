import styles from './Map.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { google_location } from '@data/business';

const Map = () => {
  
  return (
    <div className={styles.container}>
      <Link href={google_location} rel="noopener noreferrer" target="_blank">
        <Image src="/map.png" alt="map" width={1000} height={1000} />
      </Link>
    </div>
  );
};

export default Map;