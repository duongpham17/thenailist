import styles from './Boolean.module.scss';

interface Props {
    message: string,
    value: boolean,
    onClick: () => void,
};

const Checkbox = ({message, onClick, value}:Props) => {
    
  return (
    <div className={styles.container}>
        <button type="button" className={value ? styles.selected : styles.unselected} onClick={onClick} />
        <p>{message}</p>
    </div>
  )
}

export default Checkbox